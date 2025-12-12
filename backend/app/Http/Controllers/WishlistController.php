<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\PgListing;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    /**
     * Toggle wishlist status for a PG listing
     */
    public function toggle(Request $request, $pgId): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required'
                ], 401);
            }

            $pgListing = PgListing::find($pgId);
            
            if (!$pgListing) {
                return response()->json([
                    'success' => false,
                    'message' => 'PG listing not found'
                ], 404);
            }

            $wishlist = Wishlist::where('user_id', $user->id)
                ->where('pg_listing_id', $pgId)
                ->first();

            if ($wishlist) {
                // Remove from wishlist
                $wishlist->delete();
                return response()->json([
                    'success' => true,
                    'is_wishlisted' => false,
                    'message' => 'Removed from wishlist'
                ]);
            } else {
                // Add to wishlist
                Wishlist::create([
                    'user_id' => $user->id,
                    'pg_listing_id' => $pgId,
                ]);
                return response()->json([
                    'success' => true,
                    'is_wishlisted' => true,
                    'message' => 'Added to wishlist'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating wishlist: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check if a PG is wishlisted by the current user
     */
    public function check($pgId): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => true,
                    'is_wishlisted' => false
                ]);
            }

            $isWishlisted = Wishlist::where('user_id', $user->id)
                ->where('pg_listing_id', $pgId)
                ->exists();

            return response()->json([
                'success' => true,
                'is_wishlisted' => $isWishlisted
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error checking wishlist: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all wishlisted PGs for the current user
     */
    public function index(): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required'
                ], 401);
            }

            $wishlists = Wishlist::where('user_id', $user->id)
                ->with(['pgListing.sharingTypes', 'pgListing.amenities.amenityType', 'pgListing.nearbyPlaces', 'pgListing.images'])
                ->get();

            $pgs = $wishlists->map(function ($wishlist) {
                $pg = $wishlist->pgListing;
                if (!$pg) return null;

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
            })->filter();

            return response()->json([
                'success' => true,
                'data' => $pgs->values()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching wishlist: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check wishlist status for multiple PGs at once
     */
    public function checkMultiple(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => true,
                    'data' => []
                ]);
            }

            $pgIds = $request->input('pg_ids', []);
            
            if (empty($pgIds) || !is_array($pgIds)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid pg_ids provided'
                ], 400);
            }

            $wishlistedIds = Wishlist::where('user_id', $user->id)
                ->whereIn('pg_listing_id', $pgIds)
                ->pluck('pg_listing_id')
                ->toArray();

            $result = [];
            foreach ($pgIds as $pgId) {
                $result[$pgId] = in_array($pgId, $wishlistedIds);
            }

            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error checking wishlist: ' . $e->getMessage()
            ], 500);
        }
    }
}
