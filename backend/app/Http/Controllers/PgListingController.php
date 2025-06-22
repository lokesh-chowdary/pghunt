<?php

namespace App\Http\Controllers;

use App\Models\PgListing;
use App\Models\SharingType;
use App\Models\Amenity;
use App\Models\AmenityType;
use App\Models\NearbyPlace;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PgListingController extends Controller
{
    /**
     * Display a listing of all PG listings
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Get paginated PG listings with relationships
            $pgs = PgListing::with([
                'sharingTypes', 
                'amenities.amenityType', 
                'nearbyPlaces', 
                'images'
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(12);
            
            // Transform the data for frontend
            $transformedPgs = $pgs->map(function ($pg) {
                $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
                
                return [
                    'id' => $pg->id,
                    'user_id' => $pg->user_id,
                    'name' => $pg->pg_name,
                    'pg_name' => $pg->pg_name,
                    'address' => $pg->address,
                    'city' => $pg->city,
                    'area' => $pg->area,
                    'price' => (float) $lowestRent,
                    'category' => $pg->category,
                    'preferred_for' => $pg->preferred_for,
                    'rating' => 4.5, // Default rating for now
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
                'data' => $transformedPgs,
                'pagination' => [
                    'total' => $pgs->total(),
                    'per_page' => $pgs->perPage(),
                    'current_page' => $pgs->currentPage(),
                    'last_page' => $pgs->lastPage()
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching PG listings', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch PG listings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Display a specific PG listing
     */
    public function show($id): JsonResponse
    {
        try {
            $pg = PgListing::with([
                'sharingTypes', 
                'amenities.amenityType', 
                'nearbyPlaces', 
                'images'
            ])->findOrFail($id);
            
            $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
            
            $transformedPg = [
                'id' => $pg->id,
                'user_id' => $pg->user_id,
                'name' => $pg->pg_name,
                'pg_name' => $pg->pg_name,
                'address' => $pg->address,
                'city' => $pg->city,
                'area' => $pg->area,
                'price' => (float) $lowestRent,
                'category' => $pg->category,
                'preferred_for' => $pg->preferred_for,
                'phone_number' => $pg->phone_number,
                'whatsapp_number' => $pg->whatsapp_number,
                'security_deposit' => $pg->security_deposit,
                'notice_period' => $pg->notice_period,
                'refundable_on_exit' => $pg->refundable_on_exit,
                'youtube_link' => $pg->youtube_link,
                'rating' => 4.5, // Default rating for now
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
            
            return response()->json([
                'success' => true,
                'data' => $transformedPg
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'PG listing not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error fetching PG listing', [
                'message' => $e->getMessage(),
                'pg_id' => $id
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch PG listing',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Store a newly created PG listing
     */
    public function store(Request $request): JsonResponse
    {
        Log::info('PgListingController::store called');
        
        try {
            // Validate the request
            $validator = Validator::make($request->all(), [
                'pg_name' => 'required|string|max:255',
                'address' => 'required|string',
                'category' => 'required|string',
                'preferred_for' => 'required|string',
                'city' => 'required|string',
                'area' => 'required|string',
                'phone_number' => 'required|string|regex:/^[0-9]{10}$/',
                'whatsapp_number' => 'nullable|string|regex:/^[0-9]{10}$/',
                'sharing_types' => 'required|json',
                'amenities' => 'required|json',
                'nearby_places' => 'required|json',
                'security_deposit' => 'required|numeric|min:0',
                'notice_period' => 'required|integer|min:1|max:365',
                'refundable_on_exit' => 'required|boolean',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'youtube_link' => 'nullable|url',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            $user = $request->user();
            
            DB::beginTransaction();
            
            try {
                // Create PG listing
                $pgListing = PgListing::create([
                    'user_id' => $user->id,
                    'pg_name' => $request->pg_name,
                    'address' => $request->address,
                    'category' => $request->category,
                    'preferred_for' => $request->preferred_for,
                    'city' => $request->city,
                    'area' => $request->area,
                    'phone_number' => $request->phone_number,
                    'whatsapp_number' => $request->whatsapp_number,
                    'security_deposit' => $request->security_deposit,
                    'notice_period' => $request->notice_period,
                    'refundable_on_exit' => $request->refundable_on_exit,
                    'youtube_link' => $request->youtube_link,
                ]);
                
                // Handle sharing types
                $sharingTypes = json_decode($request->sharing_types, true);
                foreach ($sharingTypes as $type => $data) {
                    if ($data['enabled']) {
                        SharingType::create([
                            'pg_listing_id' => $pgListing->id,
                            'type' => $type,
                            'rent' => $data['rent'],
                            'enabled' => $data['enabled'],
                        ]);
                    }
                }
                
                // Handle amenities
                $amenities = json_decode($request->amenities, true);
                foreach ($amenities as $amenityId) {
                    $amenityType = AmenityType::where('amenity_id', $amenityId)->first();
                    if ($amenityType) {
                        Amenity::create([
                            'pg_listing_id' => $pgListing->id,
                            'amenity_type_id' => $amenityType->id,
                        ]);
                    }
                }
                
                // Handle nearby places
                $nearbyPlaces = json_decode($request->nearby_places, true);
                foreach ($nearbyPlaces as $place) {
                    NearbyPlace::create([
                        'pg_listing_id' => $pgListing->id,
                        'place' => $place,
                    ]);
                }
                
                // Handle image uploads
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = $image->store('pg_images', 'public');
                        Image::create([
                            'pg_listing_id' => $pgListing->id,
                            'path' => Storage::url($path),
                        ]);
                    }
                }
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'PG listing created successfully',
                    'data' => $pgListing->load(['sharingTypes', 'amenities.amenityType', 'nearbyPlaces', 'images'])
                ], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Error creating PG listing', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create PG listing',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get PG listings for the authenticated user
     */
    public function getUserListings(Request $request): JsonResponse
    {
        Log::info('getUserListings method called in PgListingController', [
            'request' => $request->all(),
            'user' => $request->user() ? $request->user()->id : 'Not authenticated'
        ]);
        
        try {
            // Get the authenticated user
            $user = $request->user();
            
            // REQUIRE authentication
            if (!$user) {
                Log::warning('No authenticated user found in getUserListings');
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required to view your listings',
                ], 401);
            }
            
            Log::info('Getting listings for user', ['user_id' => $user->id]);
            
            // Fetch PG listings for this user
            $pgs = PgListing::where('user_id', $user->id)
                ->with([
                    'sharingTypes', 
                    'amenities.amenityType', 
                    'nearbyPlaces', 
                    'images'
                ])
                ->orderBy('created_at', 'desc')
                ->get();
            
            Log::info('Found PG listings', ['count' => $pgs->count()]);
            
            // Transform data for frontend
            $transformedPgs = $pgs->map(function ($pg) {
                $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
                
                return [
                    'id' => $pg->id,
                    'user_id' => $pg->user_id,
                    'name' => $pg->pg_name,
                    'pg_name' => $pg->pg_name,
                    'address' => $pg->address,
                    'city' => $pg->city,
                    'area' => $pg->area,
                    'price' => (float) $lowestRent,
                    'category' => $pg->category,
                    'preferred_for' => $pg->preferred_for,
                    'phone_number' => $pg->phone_number,
                    'whatsapp_number' => $pg->whatsapp_number,
                    'rating' => 4.5, // Default rating for now
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
            Log::error('Error fetching user PG listings', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch your PG listings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Delete a PG listing
     */
    public function destroy($id): JsonResponse
    {
        try {
            $user = auth()->user();
            
            // Find the PG listing
            $pgListing = PgListing::findOrFail($id);
            
            // Check if the user owns this listing
            if ($pgListing->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to delete this listing'
                ], 403);
            }
            
            // Delete the listing
            $pgListing->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Listing deleted successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Listing not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting PG listing', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete listing',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update a PG listing
     */
    public function update(Request $request, $id): JsonResponse
    {
        Log::info('PgListingController::update called', ['id' => $id]);
        
        return response()->json([
            'success' => false,
            'message' => 'Update method not implemented yet'
        ], 501);
    }
}
