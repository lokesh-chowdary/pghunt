<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PgListing;

class UserListingController extends Controller
{
    public function getUserListings(Request $request)
    {
        try {
            $userId = $request->input('user_id');
            if (!$userId) {
                return response()->json(['success' => false, 'message' => 'User ID is required'], 400);
            }

            $listings = PgListing::with(['sharingTypes', 'amenities.amenityType', 'nearbyPlaces', 'images'])
                ->where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get();

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
                        'rating' => 4.5, // TODO: Make dynamic if needed
                        'images' => $pg->images->pluck('path')->count() > 0
                            ? $pg->images->pluck('path')
                            : ['https://picsum.photos/640/480?random=' . $pg->id],
                    ];
                });
                return response()->json(['success' => true, 'data' => $transformedPgs, 'source' => 'database']);
            }

            $mockFile = public_path('api-mock/listings.json');
            if (!file_exists($mockFile)) {
                return response()->json(['success' => false, 'message' => 'No listings found and mock data unavailable'], 404);
            }

            $mockData = json_decode(file_get_contents($mockFile), true);
            return response()->json(['success' => true, 'data' => $mockData, 'source' => 'mock']);
        } catch (\Exception $e) {
            \Log::error('Error in getUserListings: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['success' => false, 'message' => 'Server error'], 500);
        }
    }
}
