<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['supplier.user:id,first_name,last_name', 'reviews:id,reviewable_id,rating'])
            ->active();

        // Filter by category
        if ($request->has('category')) {
            $query->inCategory($request->category);
        }

        // Filter by subcategory
        if ($request->has('subcategory')) {
            $query->inSubcategory($request->subcategory);
        }

        // Filter by price range
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->priceBetween($request->min_price, $request->max_price);
        }

        // Filter by availability
        if ($request->boolean('in_stock')) {
            $query->inStock();
        }

        // Filter by supplier
        if ($request->has('supplier_id')) {
            $query->where('supplier_id', $request->supplier_id);
        }

        // Search functionality
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        if (in_array($sortBy, ['created_at', 'name', 'price', 'stock_quantity'])) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = min($request->get('per_page', 15), 50);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Products retrieved successfully'
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request): JsonResponse
    {
        // Check if user has a supplier profile
        if (!Auth::user()->supplier) {
            return response()->json([
                'success' => false,
                'message' => 'You need a supplier profile to add products'
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'category' => 'required|string|max:100',
            'subcategory' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'stock_quantity' => 'required|integer|min:0',
            'minimum_order' => 'nullable|integer|min:1',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'specifications' => 'nullable|array',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'expiry_date' => 'nullable|date|after:today',
            'manufacturing_date' => 'nullable|date|before_or_equal:today',
            'brand' => 'nullable|string|max:100',
            'origin_country' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $data['supplier_id'] = Auth::user()->supplier->id;
        $data['status'] = 'active';

        // Handle image uploads
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('products/images', 'public');
                $images[] = Storage::url($imagePath);
            }
            $data['images'] = $images;
        }

        $product = Product::create($data);

        // Log activity
        ActivityLog::logActivity(
            'created',
            'added new product: ' . $product->name,
            Auth::id(),
            'Product',
            $product->id
        );

        return response()->json([
            'success' => true,
            'data' => $product->load(['supplier.user:id,first_name,last_name']),
            'message' => 'Product created successfully'
        ], 201);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product): JsonResponse
    {
        // Log product view if user is authenticated
        if (Auth::check()) {
            ActivityLog::logProductView(Auth::id(), $product->id);
        }

        $product->load([
            'supplier.user:id,first_name,last_name,phone,email',
            'reviews.reviewer:id,first_name,last_name',
            'marketPrices' => function($query) {
                $query->recent()->orderBy('price_date', 'desc');
            }
        ]);

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Product retrieved successfully'
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        // Check if user owns the product or is admin
        if ($product->supplier->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this product'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'string|max:2000',
            'category' => 'string|max:100',
            'subcategory' => 'nullable|string|max:100',
            'price' => 'numeric|min:0',
            'unit' => 'string|max:50',
            'stock_quantity' => 'integer|min:0',
            'minimum_order' => 'nullable|integer|min:1',
            'status' => 'in:active,inactive,out_of_stock',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'specifications' => 'nullable|array',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'expiry_date' => 'nullable|date|after:today',
            'manufacturing_date' => 'nullable|date|before_or_equal:today',
            'brand' => 'nullable|string|max:100',
            'origin_country' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle image uploads
        if ($request->hasFile('images')) {
            // Delete old images
            if ($product->images) {
                foreach ($product->images as $imageUrl) {
                    $imagePath = str_replace('/storage/', '', $imageUrl);
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $images = [];
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('products/images', 'public');
                $images[] = Storage::url($imagePath);
            }
            $data['images'] = $images;
        }

        $product->update($data);

        // Log activity
        ActivityLog::logActivity(
            'updated',
            'updated product: ' . $product->name,
            Auth::id(),
            'Product',
            $product->id
        );

        return response()->json([
            'success' => true,
            'data' => $product->load(['supplier.user:id,first_name,last_name']),
            'message' => 'Product updated successfully'
        ]);
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product): JsonResponse
    {
        // Check if user owns the product or is admin
        if ($product->supplier->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this product'
            ], 403);
        }

        // Delete associated images
        if ($product->images) {
            foreach ($product->images as $imageUrl) {
                $imagePath = str_replace('/storage/', '', $imageUrl);
                Storage::disk('public')->delete($imagePath);
            }
        }

        // Log activity before deletion
        ActivityLog::logActivity(
            'deleted',
            'deleted product: ' . $product->name,
            Auth::id(),
            'Product',
            $product->id
        );

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }

    /**
     * Get product categories.
     */
    public function categories(): JsonResponse
    {
        $categories = [
            'seeds' => [
                'name' => 'Seeds',
                'subcategories' => ['maize', 'rice', 'beans', 'vegetables', 'fruits']
            ],
            'fertilizers' => [
                'name' => 'Fertilizers',
                'subcategories' => ['organic', 'inorganic', 'foliar', 'compound']
            ],
            'pesticides' => [
                'name' => 'Pesticides',
                'subcategories' => ['herbicides', 'insecticides', 'fungicides', 'rodenticides']
            ],
            'tools' => [
                'name' => 'Tools & Equipment',
                'subcategories' => ['hand_tools', 'machinery', 'irrigation', 'storage']
            ],
            'livestock' => [
                'name' => 'Livestock Supplies',
                'subcategories' => ['feed', 'medicine', 'equipment', 'supplements']
            ],
            'processing' => [
                'name' => 'Processing Equipment',
                'subcategories' => ['milling', 'drying', 'packaging', 'storage']
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Product categories retrieved successfully'
        ]);
    }

    /**
     * Update product stock.
     */
    public function updateStock(Request $request, Product $product): JsonResponse
    {
        // Check if user owns the product
        if ($product->supplier->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this product stock'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'action' => 'required|in:add,subtract,set',
            'quantity' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $oldStock = $product->stock_quantity;

        switch ($request->action) {
            case 'add':
                $product->increaseStock($request->quantity);
                break;
            case 'subtract':
                if (!$product->reduceStock($request->quantity)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient stock quantity'
                    ], 400);
                }
                break;
            case 'set':
                $product->update(['stock_quantity' => $request->quantity]);
                break;
        }

        $product->refresh();

        // Log activity
        ActivityLog::logActivity(
            'stock_updated',
            "updated stock for {$product->name} from {$oldStock} to {$product->stock_quantity}",
            Auth::id(),
            'Product',
            $product->id
        );

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Product stock updated successfully'
        ]);
    }
}