<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Create a new UserController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get user profile.
     */
    public function getProfile(): JsonResponse
    {
        $user = auth()->user();
        $user->load('profile', 'supplier');

        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }

    /**
     * Update user profile.
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|nullable|string|max:20',
            'region' => 'sometimes|nullable|string|max:100',
            'district' => 'sometimes|nullable|string|max:100',
            'ward' => 'sometimes|nullable|string|max:100',
            'farm_size' => 'sometimes|nullable|numeric|min:0',
            'farm_location' => 'sometimes|nullable|string',
            'crops_grown' => 'sometimes|nullable|array',
            'livestock_owned' => 'sometimes|nullable|array',
            'farming_experience' => 'sometimes|nullable|integer|min:0',
            'education_level' => 'sometimes|nullable|string|max:100',
            'preferred_language' => 'sometimes|in:en,sw',
            'bio' => 'sometimes|nullable|string|max:1000',
            'coordinates' => 'sometimes|nullable|array',
            'coordinates.latitude' => 'required_with:coordinates|numeric|between:-90,90',
            'coordinates.longitude' => 'required_with:coordinates|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Update user basic information
            $userFields = $request->only([
                'first_name', 'last_name', 'phone', 'region', 'district', 'ward'
            ]);
            
            if (!empty($userFields)) {
                $user->update($userFields);
            }

            // Update or create user profile
            $profileFields = $request->only([
                'farm_size', 'farm_location', 'crops_grown', 'livestock_owned',
                'farming_experience', 'education_level', 'preferred_language', 'bio', 'coordinates'
            ]);

            if (!empty($profileFields)) {
                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    $profileFields
                );
            }

            // Log the profile update
            activity()
                ->causedBy($user)
                ->performedOn($user)
                ->log('User updated profile');

            // Reload user with profile
            $user->load('profile');

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload profile image.
     */
    public function uploadProfileImage(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', // 2MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = auth()->user();

            // Delete old profile image if exists
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('profile-images', 'public');

            // Update user profile image
            $user->update(['profile_image' => $imagePath]);

            // Log the image upload
            activity()
                ->causedBy($user)
                ->performedOn($user)
                ->log('User uploaded profile image');

            return response()->json([
                'success' => true,
                'message' => 'Profile image uploaded successfully',
                'image_url' => Storage::url($imagePath)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user statistics.
     */
    public function getStatistics(): JsonResponse
    {
        $user = auth()->user();

        $stats = [
            'total_content' => $user->content()->count(),
            'published_content' => $user->content()->where('status', 'published')->count(),
            'total_consultations' => 0,
            'answered_consultations' => 0,
            'farm_records' => $user->farmRecords()->count(),
            'reviews_given' => $user->reviews()->count(),
        ];

        // Add consultation stats based on user type
        if ($user->isFarmer()) {
            $stats['total_consultations'] = $user->consultationsAsFarmer()->count();
            $stats['answered_consultations'] = $user->consultationsAsFarmer()
                ->where('status', 'answered')->count();
        } elseif ($user->isExtensionOfficer()) {
            $stats['total_consultations'] = $user->consultationsAsOfficer()->count();
            $stats['answered_consultations'] = $user->consultationsAsOfficer()
                ->where('status', 'answered')->count();
        }

        // Add supplier stats if user is a supplier
        if ($user->supplier) {
            $stats['total_products'] = $user->supplier->products()->count();
            $stats['active_products'] = $user->supplier->products()
                ->where('status', 'active')->count();
            $stats['supplier_rating'] = $user->supplier->rating;
            $stats['total_supplier_reviews'] = $user->supplier->total_reviews;
        }

        return response()->json([
            'success' => true,
            'statistics' => $stats
        ]);
    }

    /**
     * Get user activity feed.
     */
    public function getActivityFeed(Request $request): JsonResponse
    {
        $user = auth()->user();
        $limit = $request->get('limit', 20);

        $activities = activity()
            ->causedBy($user)
            ->latest()
            ->limit($limit)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'description' => $activity->description,
                    'created_at' => $activity->created_at,
                    'properties' => $activity->properties,
                ];
            });

        return response()->json([
            'success' => true,
            'activities' => $activities
        ]);
    }

    /**
     * Delete user account.
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
            'confirmation' => 'required|in:DELETE_MY_ACCOUNT',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = auth()->user();

        // Verify password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password is incorrect'
            ], 400);
        }

        try {
            // Log the account deletion
            activity()
                ->causedBy($user)
                ->log('User deleted account');

            // Delete profile image if exists
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }

            // Soft delete or anonymize user data based on requirements
            $user->update([
                'email' => 'deleted_' . $user->id . '@deleted.com',
                'status' => 'inactive',
                'first_name' => 'Deleted',
                'last_name' => 'User',
                'phone' => null,
                'profile_image' => null,
            ]);

            // Or completely delete: $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Account deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete account',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}