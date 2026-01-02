<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Authentication routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
    Route::post('/resend-verification', [AuthController::class, 'resendVerification']);

    // Public content routes
    Route::get('/content', [ContentController::class, 'index']);
    Route::get('/content/{content}', [ContentController::class, 'show']);
    Route::get('/content/categories', [ContentController::class, 'categories']);

    // Public supplier routes
    Route::get('/suppliers', [SupplierController::class, 'index']);
    Route::get('/suppliers/{supplier}', [SupplierController::class, 'show']);
    Route::get('/suppliers/{supplier}/products', [SupplierController::class, 'products']);
    Route::get('/supplier-types', [SupplierController::class, 'types']);

    // Public product routes
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::get('/product-categories', [ProductController::class, 'categories']);
});

// Protected routes
Route::prefix('v1')->middleware('auth:api')->group(function () {
    // Authentication routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);

    // User routes
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::post('/profile/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('/change-password', [UserController::class, 'changePassword']);
    Route::get('/dashboard-stats', [UserController::class, 'dashboardStats']);
    Route::get('/notifications', [UserController::class, 'notifications']);
    Route::put('/notifications/{notification}/read', [UserController::class, 'markNotificationAsRead']);
    Route::put('/notifications/mark-all-read', [UserController::class, 'markAllNotificationsAsRead']);

    // Content routes
    Route::get('/my-content', [ContentController::class, 'myContent']);
    Route::post('/content', [ContentController::class, 'store']);
    Route::put('/content/{content}', [ContentController::class, 'update']);
    Route::delete('/content/{content}', [ContentController::class, 'destroy']);

    // Supplier routes
    Route::get('/my-supplier-profile', [SupplierController::class, 'myProfile']);
    Route::post('/suppliers', [SupplierController::class, 'store']);
    Route::put('/suppliers/{supplier}', [SupplierController::class, 'update']);

    // Product routes
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::put('/products/{product}/stock', [ProductController::class, 'updateStock']);

    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        // User management
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{user}', [UserController::class, 'show']);
        Route::put('/users/{user}/status', [UserController::class, 'updateStatus']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        // Supplier verification
        Route::put('/suppliers/{supplier}/verify', [SupplierController::class, 'verify']);
        Route::put('/suppliers/{supplier}/reject', [SupplierController::class, 'reject']);

        // Content moderation
        Route::get('/content/pending', [ContentController::class, 'pending']);
        Route::put('/content/{content}/approve', [ContentController::class, 'approve']);
        Route::put('/content/{content}/reject', [ContentController::class, 'reject']);

        // System statistics
        Route::get('/stats', [UserController::class, 'adminStats']);
        Route::get('/activity-logs', [UserController::class, 'activityLogs']);
    });

    // Extension Officer routes
    Route::middleware('extension_officer')->prefix('extension')->group(function () {
        Route::get('/consultations', [ConsultationController::class, 'index']);
        Route::get('/consultations/{consultation}', [ConsultationController::class, 'show']);
        Route::put('/consultations/{consultation}/accept', [ConsultationController::class, 'accept']);
        Route::put('/consultations/{consultation}/complete', [ConsultationController::class, 'complete']);
        Route::get('/my-consultations', [ConsultationController::class, 'myConsultations']);
    });

    // Farmer routes
    Route::middleware('farmer')->prefix('farmer')->group(function () {
        Route::get('/farm-records', [FarmRecordController::class, 'index']);
        Route::post('/farm-records', [FarmRecordController::class, 'store']);
        Route::get('/farm-records/{farmRecord}', [FarmRecordController::class, 'show']);
        Route::put('/farm-records/{farmRecord}', [FarmRecordController::class, 'update']);
        Route::delete('/farm-records/{farmRecord}', [FarmRecordController::class, 'destroy']);
        
        Route::post('/consultations', [ConsultationController::class, 'store']);
        Route::get('/my-consultations', [ConsultationController::class, 'myConsultations']);
    });
});

// Fallback route for API
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'API endpoint not found'
    ], 404);
});