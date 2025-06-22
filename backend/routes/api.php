<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PGController;
use App\Http\Controllers\PgListingController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserProfileController;
use App\Services\AmenityService;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These are the API routes for your application. They are loaded by the
| RouteServiceProvider within the "api" middleware group.
|
*/

// Include debug routes for troubleshooting
require __DIR__.'/debug.php';

// Public Routes (No authentication required)
Route::group(['middleware' => ['cors']], function () {
    // Authentication
    Route::post('/register', [AuthController::class, 'register']); // User registration
    Route::post('/login', [AuthController::class, 'login']); // User login

    // PG Listing (Public)
    Route::get('/pgs', [PgListingController::class, 'index'])->missing(function () {
        return response()->json(['message' => 'Index method not implemented yet'], 501);
    }); // List all PGs
    Route::get('/pgs/{id}', [PgListingController::class, 'show'])->missing(function () {
        return response()->json(['message' => 'Show method not implemented yet'], 501);
    }); // Fetch a single PG by ID

    // CSRF Cookie (Required for Laravel Sanctum)
    Route::get('/sanctum/csrf-cookie', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });

    // Handle CORS preflight requests
    Route::options('/{any}', function () {
        return response()->json([], 204);
    })->where('any', '.*');
});

// Health check endpoint for monitoring
Route::get('/health', function() {
    return response()->json([
        'status' => 'healthy',
        'time' => now()->toDateTimeString()
    ]);
});

// Test endpoint with debugging - no auth required
Route::get('/test-user-listings', function (Request $request) {
    \Log::info('Test endpoint called', ['headers' => $request->headers->all()]);
    
    // Return some test data
    return response()->json([
        'success' => true,
        'message' => 'Test endpoint working',
        'data' => [
            [
                'id' => 999,
                'name' => 'Test PG',
                'user_id' => 2,
                'pg_name' => 'Test PG',
                'address' => 'Test Address',
                'images' => ['/img/test.jpg'],
                'sharing_types' => []
            ]
        ]
    ]);
});

// User listings endpoint - secured by checking user in the request
Route::get('/user-listings', function (Request $request) {
    try {
        \Log::info('User listings endpoint called', [
            'headers' => $request->header('Authorization') ? 'Auth header present' : 'No auth header',
            'user_id' => $request->input('user_id', 'Not provided')
        ]);
        
        // Get the user ID from the request
        $userId = $request->input('user_id');
        
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'User ID is required',
            ], 400);
        }
        
        // Log for debugging
        \Log::info('Fetching listings for user', ['user_id' => $userId]);
        
        // Query builder for user's listings only
        $query = \App\Models\PgListing::with(['sharingTypes', 'amenities.amenityType', 'nearbyPlaces', 'images'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc');
        
        // Get the listings
        $listings = $query->get();
        
        // If database has data, transform and return it
        if ($listings->count() > 0) {
            $transformedPgs = $listings->map(function ($pg) {
                $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
                
                return [
                    'id' => $pg->id,
                    'user_id' => $pg->user_id,
                    'name' => $pg->pg_name ?? 'Unnamed PG',
                    'address' => $pg->address ?? 'Unknown Address',
                    'city' => $pg->city ?? 'Unknown City',
                    'area' => $pg->area ?? 'Unknown Area',
                    'price' => (float) $lowestRent,
                    'category' => $pg->category ?? 'Standard',
                    'preferred_for' => $pg->preferred_for ?? 'All',
                    'rating' => 4.5,
                    'images' => $pg->images->pluck('path')->count() > 0 
                              ? $pg->images->pluck('path') 
                              : ['https://picsum.photos/640/480?random=' . $pg->id],
                ];
            });
            
            return response()->json([
                'success' => true,
                'data' => $transformedPgs,
                'source' => 'database'
            ])->withHeaders([
                'Access-Control-Allow-Origin' => 'http://localhost:5173',
                'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
            ]);
        }
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Database error: ' . $e->getMessage());
    }
    
    // Fallback to mock data
    return response()->json(json_decode(file_get_contents(public_path('api-mock/listings.json'))))
        ->withHeaders([
            'Access-Control-Allow-Origin' => 'http://localhost:5173',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
        ]);
});

// Profile data endpoint with mock fallback
Route::get('/api/profile', function (Request $request) {
    return response()->json(json_decode(file_get_contents(public_path('api-mock/profile.json'))))
        ->withHeaders([
            'Access-Control-Allow-Origin' => 'http://localhost:5173',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
        ]);
});

// Handle OPTIONS preflight requests
Route::options('/api/{any}', function () {
    return response('', 200)
        ->withHeaders([
            'Access-Control-Allow-Origin' => 'http://localhost:5173',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
        ]);
})->where('any', '.*');

// Public PG endpoints (no auth required)
Route::get('/public-listings', function (Request $request) {
    try {
        // Get data from the database - for public viewing
        $listings = \App\Models\PgListing::with(['sharingTypes', 'amenities.amenityType', 'nearbyPlaces', 'images'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
            
        // Transform and return data
        $transformedPgs = $listings->map(function ($pg) {
            $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
            
            return [
                'id' => $pg->id,
                'user_id' => $pg->user_id,
                'name' => $pg->pg_name ?? 'Unnamed PG',
                'pg_name' => $pg->pg_name ?? 'Unnamed PG',
                'address' => $pg->address ?? 'Unknown Address',
                'city' => $pg->city ?? 'Unknown City',
                'area' => $pg->area ?? 'Unknown Area',
                'price' => (float) $lowestRent,
                'category' => $pg->category ?? 'Standard',
                'preferred_for' => $pg->preferred_for ?? 'All',
                'rating' => 4.5,
                'sharing_types' => $pg->sharingTypes->map(function ($sharing) {
                    return [
                        'type' => $sharing->type,
                        'rent' => $sharing->rent,
                        'enabled' => $sharing->enabled,
                    ];
                }),
                'amenities' => $pg->amenities->map(function ($amenity) {
                    return $amenity->amenityType->name ?? $amenity->amenityType->amenity_id;
                })->toArray(),
                'roomTypes' => $pg->sharingTypes->where('enabled', true)->pluck('type')->toArray(),
                'occupancy' => $pg->sharingTypes->where('enabled', true)->pluck('type')->toArray(),
                'nearby_places' => $pg->nearbyPlaces->pluck('place'),
                'images' => $pg->images->pluck('path'),
                'created_at' => $pg->created_at,
                'updated_at' => $pg->updated_at,
            ];
        });
        
        return response()->json([
            'success' => true,
            'data' => $transformedPgs
        ]);
    } catch (\Exception $e) {
        \Log::error('Error in public listings:', ['error' => $e->getMessage()]);
        return response()->json([
            'success' => false,
            'message' => 'Failed to fetch public listings'
        ], 500);
    }
});

// Add endpoint to create a new PG listing 
Route::post('/listings', function (Request $request) {
    try {
        \Log::info('Creating new PG listing', [
            'user_id' => $request->input('user_id'),
            'has_files' => $request->hasFile('images') ? 'yes' : 'no'
        ]);
        
        // Validate the request
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'pg_name' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'area' => 'required|string|max:100',
            'user_id' => 'required|exists:users,id',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Create PG listing
        $pgListing = new \App\Models\PgListing();
        $pgListing->user_id = $request->input('user_id');
        $pgListing->pg_name = $request->input('pg_name');
        $pgListing->address = $request->input('address');
        $pgListing->city = $request->input('city');
        $pgListing->area = $request->input('area');
        $pgListing->category = $request->input('category');
        $pgListing->preferred_for = $request->input('preferred_for');
        $pgListing->phone_number = $request->input('phone_number');
        $pgListing->whatsapp_number = $request->input('whatsapp_number');
        $pgListing->security_deposit = $request->input('security_deposit');
        $pgListing->notice_period = $request->input('notice_period');
        $pgListing->refundable_on_exit = $request->input('refundable_on_exit') == '1';
        $pgListing->save();
        
        // Process sharing types
        if ($request->has('sharing_types')) {
            $sharingTypes = json_decode($request->input('sharing_types'), true);
            
            foreach ($sharingTypes as $type => $details) {
                if ($details['enabled']) {
                    $sharingType = new \App\Models\SharingType();
                    $sharingType->pg_listing_id = $pgListing->id;
                    $sharingType->type = $type;
                    $sharingType->rent = $details['rent'];
                    $sharingType->enabled = true;
                    $sharingType->save();
                }
            }
        }
        
        // Process amenities
        if ($request->has('amenities')) {
            $amenities = json_decode($request->input('amenities'), true);
            
            foreach ($amenities as $amenityId) {
                $amenity = new \App\Models\Amenity();
                $amenity->pg_listing_id = $pgListing->id;
                $amenity->amenity_type_id = $amenityId;
                $amenity->save();
            }
        }
        
        // Process nearby places
        if ($request->has('nearby_places')) {
            $nearbyPlaces = json_decode($request->input('nearby_places'), true);
            
            foreach ($nearbyPlaces as $place) {
                $nearbyPlace = new \App\Models\NearbyPlace();
                $nearbyPlace->pg_listing_id = $pgListing->id;
                $nearbyPlace->place = $place;
                $nearbyPlace->save();
            }
        }
        
        // Process images
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            
            foreach ($images as $image) {
                // Store image
                $path = $image->store('pg-images', 'public');
                
                // Create image record
                $imageModel = new \App\Models\Image();
                $imageModel->pg_listing_id = $pgListing->id;
                $imageModel->path = $path;
                $imageModel->save();
            }
        }
        
        return response()->json([
            'success' => true,
            'message' => 'PG listing created successfully',
            'data' => [
                'id' => $pgListing->id
            ]
        ]);
    } catch (\Exception $e) {
        \Log::error('Error creating PG listing', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Failed to create PG listing: ' . $e->getMessage()
        ], 500);
    }
});

// Add delete listing endpoint without authentication (for testing)
Route::delete('/delete-listing/{id}', function (Request $request, $id) {
    try {
        \Log::info('Delete listing endpoint called', [
            'listing_id' => $id,
            'user_id' => $request->input('user_id', 'Not provided')
        ]);
        
        // Find the listing
        $listing = \App\Models\PgListing::find($id);
        
        if (!$listing) {
            return response()->json([
                'success' => false,
                'message' => 'Listing not found',
            ], 404);
        }
        
        // Verify the user owns this listing (basic security check)
        $userId = $request->input('user_id');
        if ($listing->user_id != $userId) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to delete this listing',
            ], 403);
        }
        
        // Delete related records first (to avoid foreign key constraints)
        \App\Models\SharingType::where('pg_listing_id', $id)->delete();
        \App\Models\Amenity::where('pg_listing_id', $id)->delete();
        \App\Models\NearbyPlace::where('pg_listing_id', $id)->delete();
        \App\Models\Image::where('pg_listing_id', $id)->delete();
        
        // Delete the listing
        $listing->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Listing deleted successfully',
        ]);
    } catch (\Exception $e) {
        \Log::error('Error deleting listing', [
            'message' => $e->getMessage(),
            'listing_id' => $id
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete listing: ' . $e->getMessage(),
        ], 500);
    }
});

// Add endpoint to update an existing PG listing
// Support both PUT and POST methods for compatibility with FormData
Route::match(['put', 'post'], '/update-listing/{id}', function (Request $request, $id) {
    // Log all parameters for debugging
    \Log::info('Update listing request details', [
        'id_param' => $id,
        'request_method' => $request->method(),
        'all_input' => $request->all(),
        'headers' => $request->header()
    ]);
    try {
        \Log::info('Updating PG listing', [
            'listing_id' => $id,
            'user_id' => $request->input('user_id'),
            'has_files' => $request->hasFile('images') ? 'yes' : 'no'
        ]);
        
        // Find the listing
        $pgListing = \App\Models\PgListing::find($id);
        
        if (!$pgListing) {
            return response()->json([
                'success' => false,
                'message' => 'Listing not found',
            ], 404);
        }
        
        // Verify the user owns this listing
        $userId = $request->input('user_id');
        
        // Add detailed logging to diagnose the issue
        \Log::info('Permission check details', [
            'listing_user_id' => $pgListing->user_id,
            'listing_user_id_type' => gettype($pgListing->user_id),
            'request_user_id' => $userId,
            'request_user_id_type' => gettype($userId),
            'comparison_result' => ($pgListing->user_id == $userId) ? 'match' : 'no match'
        ]);
        
        // Convert both to integers for comparison to avoid type issues
        if ((int)$pgListing->user_id !== (int)$userId) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to update this listing',
                'debug' => [
                    'listing_user_id' => (int)$pgListing->user_id,
                    'request_user_id' => (int)$userId
                ]
            ], 403);
        }
        
        // Validate the request
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'pg_name' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'area' => 'required|string|max:100',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Update PG listing
        $pgListing->pg_name = $request->input('pg_name');
        $pgListing->address = $request->input('address');
        $pgListing->city = $request->input('city');
        $pgListing->area = $request->input('area');
        $pgListing->category = $request->input('category');
        $pgListing->preferred_for = $request->input('preferred_for');
        $pgListing->phone_number = $request->input('phone_number');
        $pgListing->whatsapp_number = $request->input('whatsapp_number');
        $pgListing->security_deposit = $request->input('security_deposit');
        $pgListing->notice_period = $request->input('notice_period');
        $pgListing->refundable_on_exit = $request->input('refundable_on_exit') == '1';
        $pgListing->save();
        
        // Delete existing related records first
        \App\Models\SharingType::where('pg_listing_id', $id)->delete();
        \App\Models\Amenity::where('pg_listing_id', $id)->delete();
        \App\Models\NearbyPlace::where('pg_listing_id', $id)->delete();
        
        // Process sharing types
        if ($request->has('sharing_types')) {
            $sharingTypes = json_decode($request->input('sharing_types'), true);
            
            foreach ($sharingTypes as $type => $details) {
                if ($details['enabled']) {
                    $sharingType = new \App\Models\SharingType();
                    $sharingType->pg_listing_id = $pgListing->id;
                    $sharingType->type = $type;
                    $sharingType->rent = $details['rent'];
                    $sharingType->enabled = true;
                    $sharingType->save();
                }
            }
        }
        
        // Process amenities
        if ($request->has('amenities')) {
            $amenities = json_decode($request->input('amenities'), true);
            
            foreach ($amenities as $amenityId) {
                $amenity = new \App\Models\Amenity();
                $amenity->pg_listing_id = $pgListing->id;
                $amenity->amenity_type_id = $amenityId;
                $amenity->save();
            }
        }
        
        // Process nearby places
        if ($request->has('nearby_places')) {
            $nearbyPlaces = json_decode($request->input('nearby_places'), true);
            
            foreach ($nearbyPlaces as $place) {
                $nearbyPlace = new \App\Models\NearbyPlace();
                $nearbyPlace->pg_listing_id = $pgListing->id;
                $nearbyPlace->place = $place;
                $nearbyPlace->save();
            }
        }
        
        // Process images
        if ($request->hasFile('images')) {
            // Only delete existing images if new ones are being uploaded
            \App\Models\Image::where('pg_listing_id', $id)->delete();
            
            $images = $request->file('images');
            
            foreach ($images as $image) {
                // Store image
                $path = $image->store('pg-images', 'public');
                
                // Create image record
                $imageModel = new \App\Models\Image();
                $imageModel->pg_listing_id = $pgListing->id;
                $imageModel->path = $path;
                $imageModel->save();
            }
        }
        
        return response()->json([
            'success' => true,
            'message' => 'PG listing updated successfully',
            'data' => [
                'id' => $pgListing->id
            ]
        ]);
    } catch (\Exception $e) {
        \Log::error('Error updating PG listing', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Failed to update PG listing: ' . $e->getMessage()
        ], 500);
    }
});

// Add edit listing endpoint (for view only - for now)
Route::get('/edit-listing/{id}', function (Request $request, $id) {
    try {
        // Find the listing with all related data
        $pg = \App\Models\PgListing::with([
            'sharingTypes', 
            'amenities.amenityType', 
            'nearbyPlaces', 
            'images'
        ])->find($id);
        
        if (!$pg) {
            return response()->json([
                'success' => false,
                'message' => 'Listing not found',
            ], 404);
        }
        
        // Verify the user owns this listing
        $userId = $request->input('user_id');
        if ($pg->user_id != $userId) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to edit this listing',
            ], 403);
        }
        
        // Transform for the edit form
        $transformedPg = [
            'id' => $pg->id,
            'user_id' => $pg->user_id,
            'pg_name' => $pg->pg_name,
            'address' => $pg->address,
            'city' => $pg->city,
            'area' => $pg->area,
            'category' => $pg->category,
            'preferred_for' => $pg->preferred_for,
            'phone_number' => $pg->phone_number,
            'whatsapp_number' => $pg->whatsapp_number,
            'security_deposit' => $pg->security_deposit,
            'notice_period' => $pg->notice_period,
            'sharing_types' => $pg->sharingTypes->map(function ($sharing) {
                return [
                    'type' => $sharing->type,
                    'rent' => $sharing->rent,
                    'enabled' => $sharing->enabled,
                ];
            }),
            'amenities' => $pg->amenities->pluck('amenity_type_id'),
            'nearby_places' => $pg->nearbyPlaces->pluck('place'),
            'images' => $pg->images->pluck('path'),
        ];
        
        return response()->json([
            'success' => true,
            'data' => $transformedPg
        ]);
    } catch (\Exception $e) {
        \Log::error('Error fetching listing for edit', [
            'message' => $e->getMessage(),
            'listing_id' => $id
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Failed to fetch listing: ' . $e->getMessage(),
        ], 500);
    }
});

// Test controller endpoint - no auth required
Route::get('/test', [TestController::class, 'test']);

// Protected Routes (Require authentication via Sanctum)
Route::middleware(['auth:sanctum'])->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']); // User logout
    Route::get('/user', [AuthController::class, 'user']); // Get authenticated user info

    // User Profile Management
    Route::get('/profile', [UserProfileController::class, 'getProfile']); // Get user profile
    Route::put('/profile', [UserProfileController::class, 'updateProfile']); // Update user profile

    // Individual PG listing routes moved outside auth middleware for testing
});
