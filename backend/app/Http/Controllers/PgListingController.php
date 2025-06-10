<?php

// app/Http/Controllers/PgListingController.php
namespace App\Http\Controllers;

use App\Models\PgListing;
use App\Models\SharingType;
use App\Models\Amenity;
use App\Models\AmenityType;
use App\Models\NearbyPlace;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PgListingController extends Controller
{
    public function store(Request $request)
    {
        // Remove debug statement
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
            'security_deposit' => 'required|numeric|min:0|max:10000000',
            'notice_period' => 'required|integer|min:1|max:365',
            'refundable_on_exit' => 'required|boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB per image
            'youtube_link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Validate amenities exist
        $amenities = json_decode($request->amenities, true);
        $validAmenityIds = AmenityType::pluck('amenity_id')->toArray();
        foreach ($amenities as $amenityId) {
            if (!in_array($amenityId, $validAmenityIds)) {
                return response()->json(['error' => "Invalid amenity ID: $amenityId"], 422);
            }
        }

        // Start a transaction
        DB::beginTransaction();
        try {
            // Create PG listing
            $pgListing = PgListing::create([
                'user_id' => $request->user()->id, // Add authenticated user's ID
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
            foreach ($amenities as $amenityId) {
                $amenityType = AmenityType::where('amenity_id', $amenityId)->first();
                Amenity::create([
                    'pg_listing_id' => $pgListing->id,
                    'amenity_type_id' => $amenityType->id,
                ]);
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
                'message' => 'PG listing saved successfully',
                'data' => $pgListing->load(['sharingTypes', 'amenities.amenityType', 'nearbyPlaces', 'images']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to save PG listing: ' . $e->getMessage()], 500);
        }
    }
}