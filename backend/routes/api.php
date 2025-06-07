<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PGController;
use App\Http\Controllers\PgListingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These are the API routes for your application. They are loaded by the
| RouteServiceProvider within the "api" middleware group.
|
*/

// Public Routes (No authentication required)
Route::group(['middleware' => ['cors']], function () {
    // Authentication
    Route::post('/register', [AuthController::class, 'register']); // User registration
    Route::post('/login', [AuthController::class, 'login']); // User login

    // PG Listing (Public)
    Route::get('/pgs', [PGController::class, 'index']); // List all PGs
    Route::get('/pgs/{id}', [PGController::class, 'show']); // Fetch a single PG by ID

    // CSRF Cookie (Required for Laravel Sanctum)
    Route::get('/sanctum/csrf-cookie', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });

    // Handle CORS preflight requests
    Route::options('/{any}', function () {
        return response()->json([], 204);
    })->where('any', '.*');
});

// Protected Routes (Require authentication via Sanctum)
Route::middleware(['auth:sanctum'])->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']); // User logout
    Route::get('/user', [AuthController::class, 'user']); // Get authenticated user info

    // PG Management (Protected - Only for authenticated users)
    Route::post('/pg-listings', [PgListingController::class, 'store']); // Create PG listing (moved to protected)
    Route::post('/pgs', [PGController::class, 'store']); // Create a new PG
    Route::put('/pgs/{id}', [PGController::class, 'update']); // Update a PG
    Route::delete('/pgs/{id}', [PGController::class, 'destroy']); // Delete a PG
});