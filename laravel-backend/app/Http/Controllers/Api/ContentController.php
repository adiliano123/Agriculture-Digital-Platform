<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgriculturalContent;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    /**
     * Display a listing of agricultural content.
     */
    public function index(Request $request): JsonResponse
    {
        $query = AgriculturalContent::with(['author:id,first_name,last_name,profile_image'])
            ->published();

        // Filter by content type
        if ($request->has('type')) {
            $query->ofType($request->type);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->inCategory($request->category);
        }

        // Filter by language
        if ($request->has('language')) {
            $query->inLanguage($request->language);
        }

        // Search functionality
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Filter by featured
        if ($request->boolean('featured')) {
            $query->featured();
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'published_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if (in_array($sortBy, ['published_at', 'views_count', 'created_at', 'title'])) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = min($request->get('per_page', 15), 50);
        $content = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $content,
            'message' => 'Content retrieved successfully'
        ]);
    }

    /**
     * Store a newly created content.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'content_type' => 'required|in:article,guide,tip,news,video,infographic',
            'category' => 'required|string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'language' => 'required|in:en,sw,both',
            'featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_url' => 'nullable|url',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240',
            'status' => 'in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $data['author_id'] = Auth::id();

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('content/images', 'public');
            $data['image_url'] = Storage::url($imagePath);
        }

        // Handle attachments
        if ($request->hasFile('attachments')) {
            $attachments = [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('content/attachments', 'public');
                $attachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'url' => Storage::url($path),
                    'size' => $file->getSize(),
                    'type' => $file->getMimeType()
                ];
            }
            $data['attachments'] = $attachments;
        }

        // Set published_at if status is published
        if (($data['status'] ?? 'draft') === 'published') {
            $data['published_at'] = now();
        }

        $content = AgriculturalContent::create($data);

        // Log activity
        ActivityLog::logContentCreation(Auth::id(), $content->id);

        return response()->json([
            'success' => true,
            'data' => $content->load('author:id,first_name,last_name,profile_image'),
            'message' => 'Content created successfully'
        ], 201);
    }

    /**
     * Display the specified content.
     */
    public function show(AgriculturalContent $content): JsonResponse
    {
        // Increment views count
        $content->incrementViews();

        // Log view activity if user is authenticated
        if (Auth::check()) {
            ActivityLog::logActivity(
                'viewed',
                'viewed agricultural content: ' . $content->title,
                Auth::id(),
                'AgriculturalContent',
                $content->id
            );
        }

        $content->load(['author:id,first_name,last_name,profile_image', 'reviews.reviewer:id,first_name,last_name']);

        return response()->json([
            'success' => true,
            'data' => $content,
            'message' => 'Content retrieved successfully'
        ]);
    }

    /**
     * Update the specified content.
     */
    public function update(Request $request, AgriculturalContent $content): JsonResponse
    {
        // Check if user owns the content or is admin
        if ($content->author_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this content'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'content' => 'string',
            'excerpt' => 'nullable|string|max:500',
            'content_type' => 'in:article,guide,tip,news,video,infographic',
            'category' => 'string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'language' => 'in:en,sw,both',
            'featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_url' => 'nullable|url',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240',
            'status' => 'in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($content->image_url) {
                $oldImagePath = str_replace('/storage/', '', $content->image_url);
                Storage::disk('public')->delete($oldImagePath);
            }
            
            $imagePath = $request->file('image')->store('content/images', 'public');
            $data['image_url'] = Storage::url($imagePath);
        }

        // Handle attachments
        if ($request->hasFile('attachments')) {
            $attachments = $content->attachments ?? [];
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('content/attachments', 'public');
                $attachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'url' => Storage::url($path),
                    'size' => $file->getSize(),
                    'type' => $file->getMimeType()
                ];
            }
            $data['attachments'] = $attachments;
        }

        // Set published_at if status is being changed to published
        if (isset($data['status']) && $data['status'] === 'published' && !$content->published_at) {
            $data['published_at'] = now();
        }

        $content->update($data);

        // Log activity
        ActivityLog::logActivity(
            'updated',
            'updated agricultural content: ' . $content->title,
            Auth::id(),
            'AgriculturalContent',
            $content->id
        );

        return response()->json([
            'success' => true,
            'data' => $content->load('author:id,first_name,last_name,profile_image'),
            'message' => 'Content updated successfully'
        ]);
    }

    /**
     * Remove the specified content.
     */
    public function destroy(AgriculturalContent $content): JsonResponse
    {
        // Check if user owns the content or is admin
        if ($content->author_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this content'
            ], 403);
        }

        // Delete associated files
        if ($content->image_url) {
            $imagePath = str_replace('/storage/', '', $content->image_url);
            Storage::disk('public')->delete($imagePath);
        }

        if ($content->attachments) {
            foreach ($content->attachments as $attachment) {
                $attachmentPath = str_replace('/storage/', '', $attachment['url']);
                Storage::disk('public')->delete($attachmentPath);
            }
        }

        // Log activity before deletion
        ActivityLog::logActivity(
            'deleted',
            'deleted agricultural content: ' . $content->title,
            Auth::id(),
            'AgriculturalContent',
            $content->id
        );

        $content->delete();

        return response()->json([
            'success' => true,
            'message' => 'Content deleted successfully'
        ]);
    }

    /**
     * Get content categories.
     */
    public function categories(): JsonResponse
    {
        $categories = [
            'crop_production' => 'Crop Production',
            'livestock' => 'Livestock',
            'soil_management' => 'Soil Management',
            'pest_control' => 'Pest Control',
            'irrigation' => 'Irrigation',
            'fertilizers' => 'Fertilizers',
            'harvesting' => 'Harvesting',
            'post_harvest' => 'Post Harvest',
            'marketing' => 'Marketing',
            'finance' => 'Finance',
            'technology' => 'Technology',
            'weather' => 'Weather',
            'government_programs' => 'Government Programs',
            'cooperatives' => 'Cooperatives',
            'organic_farming' => 'Organic Farming',
        ];

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Categories retrieved successfully'
        ]);
    }

    /**
     * Get user's content.
     */
    public function myContent(Request $request): JsonResponse
    {
        $query = AgriculturalContent::where('author_id', Auth::id())
            ->with(['author:id,first_name,last_name,profile_image']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $perPage = min($request->get('per_page', 15), 50);
        $content = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $content,
            'message' => 'Your content retrieved successfully'
        ]);
    }
}