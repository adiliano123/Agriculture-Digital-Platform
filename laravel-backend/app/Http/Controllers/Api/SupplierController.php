<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\Product;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    /**
     * Display a listing of suppliers.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Supplier::with(['user:id,first_name,last_name,email,phone']);

        // Filter by verification status
        if ($request->has('verified') && $request->boolean('verified')) {
            $query->verified();
        }

        // Filter by supplier type
        if ($request->has('type')) {
            $query->ofType($request->type);
        }

        // Filter by region
        if ($request->has('region')) {
            $query->inRegion($request->region);
        }

        // Filter by district
        if ($request->has('district')) {
            $query->inDistrict($request->district);
        }

        // Search functionality
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if (in_array($sortBy, ['created_at', 'company_name', 'rating'])) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = min($request->get('per_page', 15), 50);
        $suppliers = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $suppliers,
            'message' => 'Suppliers retrieved successfully'
        ]);
    }

    /**
     * Store a newly created supplier profile.
     */
    public function store(Request $request): JsonResponse
    {
        // Check if user already has a supplier profile
        if (Auth::user()->supplier) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a supplier profile'
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255',
            'business_license' => 'nullable|string|max:100',
            'supplier_type' => 'required|in:input_dealer,equipment_supplier,service_provider,cooperative,processor',
            'description' => 'nullable|string|max:1000',
            'address' => 'required|string|max:500',
            'region' => 'required|string|max:100',
            'district' => 'required|string|max:100',
            'operating_hours' => 'nullable|array',
            'delivery_areas' => 'nullable|array',
            'delivery_areas.*' => 'string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $data['user_id'] = Auth::id();
        $data['verification_status'] = 'pending';

        $supplier = Supplier::create($data);

        // Log activity
        ActivityLog::logActivity(
            'created',
            'created supplier profile: ' . $supplier->company_name,
            Auth::id(),
            'Supplier',
            $supplier->id
        );

        return response()->json([
            'success' => true,
            'data' => $supplier->load('user:id,first_name,last_name,email,phone'),
            'message' => 'Supplier profile created successfully'
        ], 201);
    }

    /**
     * Display the specified supplier.
     */
    public function show(Supplier $supplier): JsonResponse
    {
        $supplier->load([
            'user:id,first_name,last_name,email,phone',
            'products' => function($query) {
                $query->active()->with('reviews:id,reviewable_id,rating');
            },
            'reviews.reviewer:id,first_name,last_name'
        ]);

        return response()->json([
            'success' => true,
            'data' => $supplier,
            'message' => 'Supplier retrieved successfully'
        ]);
    }

    /**
     * Update the specified supplier.
     */
    public function update(Request $request, Supplier $supplier): JsonResponse
    {
        // Check if user owns the supplier profile or is admin
        if ($supplier->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this supplier profile'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'company_name' => 'string|max:255',
            'business_license' => 'nullable|string|max:100',
            'supplier_type' => 'in:input_dealer,equipment_supplier,service_provider,cooperative,processor',
            'description' => 'nullable|string|max:1000',
            'address' => 'string|max:500',
            'region' => 'string|max:100',
            'district' => 'string|max:100',
            'operating_hours' => 'nullable|array',
            'delivery_areas' => 'nullable|array',
            'delivery_areas.*' => 'string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $supplier->update($validator->validated());

        // Log activity
        ActivityLog::logActivity(
            'updated',
            'updated supplier profile: ' . $supplier->company_name,
            Auth::id(),
            'Supplier',
            $supplier->id
        );

        return response()->json([
            'success' => true,
            'data' => $supplier->load('user:id,first_name,last_name,email,phone'),
            'message' => 'Supplier profile updated successfully'
        ]);
    }

    /**
     * Get supplier's products.
     */
    public function products(Request $request, Supplier $supplier): JsonResponse
    {
        $query = $supplier->products()->with('reviews:id,reviewable_id,rating');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->active();
        }

        // Filter by category
        if ($request->has('category')) {
            $query->inCategory($request->category);
        }

        // Search functionality
        if ($request->has('search')) {
            $query->search($request->search);
        }

        $perPage = min($request->get('per_page', 15), 50);
        $products = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Supplier products retrieved successfully'
        ]);
    }

    /**
     * Get supplier types.
     */
    public function types(): JsonResponse
    {
        $types = [
            'input_dealer' => 'Agricultural Input Dealer',
            'equipment_supplier' => 'Equipment Supplier',
            'service_provider' => 'Service Provider',
            'cooperative' => 'Cooperative',
            'processor' => 'Processor/Buyer',
        ];

        return response()->json([
            'success' => true,
            'data' => $types,
            'message' => 'Supplier types retrieved successfully'
        ]);
    }

    /**
     * Verify supplier (Admin only).
     */
    public function verify(Supplier $supplier): JsonResponse
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $supplier->update(['verification_status' => 'verified']);

        // Log activity
        ActivityLog::logActivity(
            'verified',
            'verified supplier: ' . $supplier->company_name,
            Auth::id(),
            'Supplier',
            $supplier->id
        );

        return response()->json([
            'success' => true,
            'data' => $supplier,
            'message' => 'Supplier verified successfully'
        ]);
    }

    /**
     * Reject supplier verification (Admin only).
     */
    public function reject(Request $request, Supplier $supplier): JsonResponse
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'reason' => 'required|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $supplier->update(['verification_status' => 'rejected']);

        // Log activity
        ActivityLog::logActivity(
            'rejected',
            'rejected supplier verification: ' . $supplier->company_name . ' - Reason: ' . $request->reason,
            Auth::id(),
            'Supplier',
            $supplier->id
        );

        return response()->json([
            'success' => true,
            'data' => $supplier,
            'message' => 'Supplier verification rejected'
        ]);
    }

    /**
     * Get current user's supplier profile.
     */
    public function myProfile(): JsonResponse
    {
        $supplier = Auth::user()->supplier;

        if (!$supplier) {
            return response()->json([
                'success' => false,
                'message' => 'No supplier profile found'
            ], 404);
        }

        $supplier->load([
            'user:id,first_name,last_name,email,phone',
            'products' => function($query) {
                $query->with('reviews:id,reviewable_id,rating');
            }
        ]);

        return response()->json([
            'success' => true,
            'data' => $supplier,
            'message' => 'Supplier profile retrieved successfully'
        ]);
    }
}