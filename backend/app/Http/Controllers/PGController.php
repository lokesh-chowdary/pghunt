<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\PG;

class PGController extends Controller
{
    public function index()
    {
        // Fetch all PG records from the database
        $pgs = PG::all();

        // Return the PG data as a JSON response
        return response()->json($pgs, 200);
    }

    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string',
            'price' => 'required|numeric|min:0',
            'rating' => 'required|numeric|min:0|max:5',
            'type' => 'required|in:male,female,unisex',
            'amenities' => 'required|json',
            'roomTypes' => 'required|string',
            'occupancy' => 'required|string',
            'images' => 'array', // Ensure images is an array
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate images
        ]);

        // Decode amenities JSON
        $amenities = json_decode($validated['amenities'], true);

        // Handle file uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('public/pg_images');
                $imagePaths[] = Storage::url($path); // Store file URLs
            }
        }

        // Save data to the database
        $pg = PG::create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'price' => $validated['price'],
            'rating' => $validated['rating'],
            'type' => $validated['type'],
            'amenities' => $amenities, // Save as array
            'room_types' => $validated['roomTypes'],
            'occupancy' => $validated['occupancy'],
            'images' => json_encode($imagePaths), // Save image paths as JSON
        ]);

        return response()->json(['message' => 'PG added successfully!', 'pg' => $pg], 201);
    }
    public function show($id)
    {
        try {
            $pg = PG::find($id);

            if (!$pg) {
                return response()->json(['message' => 'PG not found'], 404);
            }

            // Map database fields to expected frontend format
            $pgData = [
                'id' => $pg->id,
                'name' => $pg->name,
                'address' => $pg->address,
                'city' => $pg->city,
                'price' => $pg->price,
                'rating' => $pg->rating,
                'type' => $pg->type,
                'amenities' => $pg->amenities ?? [],
                'images' => $pg->images ?? [],
                'roomTypes' => $pg->room_types ?? [], // Map room_types to roomTypes
                'occupancy' => $pg->occupancy ?? [],
                'created_at' => $pg->created_at,
                'updated_at' => $pg->updated_at,
                'user_id' => $pg->user_id,
            ];

            return response()->json($pgData);
        } catch (\Exception $e) {
            \Log::error('Error fetching PG: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }
}
