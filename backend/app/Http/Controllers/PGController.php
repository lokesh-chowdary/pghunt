<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use App\Models\PgListing;

class PGController extends Controller
{
    /**
     * Get all PG listings
     */
    public function index(): JsonResponse
    {
        try {
            // Fetch all PG listings with their relationships
            $pgs = PgListing::with([
                'sharingTypes', 
                'amenities.amenityType', 
                'nearbyPlaces', 
                'images'
            ])->get();

            // Transform data for frontend compatibility
            $transformedPgs = $pgs->map(function ($pg) {
                // Get the lowest rent from sharing types for price display
                $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
                
                return [
                    'id' => $pg->id,
                    'name' => $pg->pg_name,
                    'address' => $pg->address,
                    'city' => $pg->city,
                    'area' => $pg->area,
                    'type' => $pg->category, // Map category to type for frontend
                    'price' => (float) $lowestRent, // Use lowest rent as price
                    'rating' => 4.5, // Default rating for now
                    'category' => $pg->category,
                    'preferred_for' => $pg->preferred_for,
                    'phone_number' => $pg->phone_number,
                    'whatsapp_number' => $pg->whatsapp_number,
                    'security_deposit' => $pg->security_deposit,
                    'notice_period' => $pg->notice_period,
                    'refundable_on_exit' => $pg->refundable_on_exit,
                    'youtube_link' => $pg->youtube_link,
                    'sharing_types' => $pg->sharingTypes->map(function ($sharing) {
                        return [
                            'type' => $sharing->type,
                            'rent' => $sharing->rent,
                            'enabled' => $sharing->enabled,
                        ];
                    }),
                    'amenities' => $pg->amenities->map(function ($amenity) {
                        return $amenity->amenityType->name ?? $amenity->amenityType->amenity_id;
                    })->toArray(), // Convert to simple string array
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
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching PG listings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch PG listings',
            ], 500);
        }
    }

    /**
     * Get a specific PG listing by ID
     */
    public function show($id): JsonResponse
    {
        try {
            $pg = PgListing::with([
                'sharingTypes', 
                'amenities.amenityType', 
                'nearbyPlaces', 
                'images'
            ])->find($id);

            if (!$pg) {
                return response()->json([
                    'success' => false,
                    'message' => 'PG listing not found'
                ], 404);
            }

            // Transform data for frontend compatibility
            $lowestRent = $pg->sharingTypes->where('enabled', true)->min('rent') ?? 0;
            
            $pgData = [
                'id' => $pg->id,
                'name' => $pg->pg_name,
                'address' => $pg->address,
                'city' => $pg->city,
                'area' => $pg->area,
                'type' => $pg->category, // Map category to type for frontend
                'price' => (float) $lowestRent, // Use lowest rent as price
                'rating' => 4.5, // Default rating for now
                'category' => $pg->category,
                'preferred_for' => $pg->preferred_for,
                'phone_number' => $pg->phone_number,
                'whatsapp_number' => $pg->whatsapp_number,
                'security_deposit' => $pg->security_deposit,
                'notice_period' => $pg->notice_period,
                'refundable_on_exit' => $pg->refundable_on_exit,
                'youtube_link' => $pg->youtube_link,
                'sharing_types' => $pg->sharingTypes->map(function ($sharing) {
                    return [
                        'type' => $sharing->type,
                        'rent' => $sharing->rent,
                        'enabled' => $sharing->enabled,
                    ];
                }),
                'amenities' => $pg->amenities->map(function ($amenity) {
                    return $amenity->amenityType->name ?? $amenity->amenityType->amenity_id;
                })->toArray(), // Convert to simple string array
                'roomTypes' => $pg->sharingTypes->where('enabled', true)->pluck('type')->toArray(),
                'occupancy' => $pg->sharingTypes->where('enabled', true)->pluck('type')->toArray(),
                'nearby_places' => $pg->nearbyPlaces->pluck('place'),
                'images' => $pg->images->pluck('path'),
                'created_at' => $pg->created_at,
                'updated_at' => $pg->updated_at,
            ];

            return response()->json([
                'success' => true,
                'data' => $pgData,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching PG listing: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch PG listing',
            ], 500);
        }
    }

    /**
     * Store method - redirects to PgListingController for consistency
     */
    public function store(Request $request): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Please use /api/pg-listings endpoint for creating new listings',
            'redirect' => '/api/pg-listings'
        ], 400);
    }

    /**
     * Update a PG listing
     */
    public function update(Request $request, $id): JsonResponse
    {
        // Implementation for updating PG listings
        return response()->json([
            'success' => false,
            'message' => 'Update functionality not implemented yet'
        ], 501);
    }

    /**
     * Delete a PG listing
     */
    public function destroy($id): JsonResponse
    {
        // Implementation for deleting PG listings
        return response()->json([
            'success' => false,
            'message' => 'Delete functionality not implemented yet'
        ], 501);
    }
}
