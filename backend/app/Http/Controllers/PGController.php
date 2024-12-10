<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate images
        ]);

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
            'amenities' => $validated['amenities'],
            'room_types' => $validated['roomTypes'],
            'occupancy' => $validated['occupancy'],
            'images' => json_encode($imagePaths), // Save image paths as JSON
        ]);

        return response()->json(['message' => 'PG added successfully!', 'pg' => $pg], 201);
    }
}
