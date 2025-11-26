<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PgListingController;
use App\Http\Controllers\UserListingController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\CallbackController;
use \Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// Public Routes (No authentication required)
Route::group(['middleware' => ['cors']], function () {
    // Authentication
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    // PG Listing (Public)
    Route::get('/pgs', [PgListingController::class, 'index'])->missing(fn() =>
        response()->json(['message' => 'Index method not implemented yet'], 501)
    );
    Route::get('/pgs/{id}', [PgListingController::class, 'show'])->missing(fn() =>
        response()->json(['message' => 'Show method not implemented yet'], 501)
    );

    // CSRF Cookie (Laravel Sanctum)
    Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

    // CORS preflight
    Route::options('/{any}', fn() =>
        response()->json([], 204)
    )->where('any', '.*');
    Route::post('/request-callback', [CallbackController::class, 'send']);

});

// Protected Routes (Require authentication via Sanctum)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/profile', [UserProfileController::class, 'getProfile']);
    Route::put('/profile', [UserProfileController::class, 'updateProfile']);
    Route::get('/edit-listing/{id}', [PgListingController::class, 'editListing']);
    Route::delete('/delete-listing/{id}', [PgListingController::class, 'destroy']);
    Route::match(['put', 'post'], '/update-listing/{id}', [PgListingController::class, 'update']);
    Route::get('/user-listings', [UserListingController::class, 'getUserListings']);
});