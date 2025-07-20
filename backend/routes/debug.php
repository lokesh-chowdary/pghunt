<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Check PG listing ownership for debugging
Route::get('/debug-pg-ownership/{pg_id}/{user_id}', function (Request $request, $pg_id, $user_id) {
    $pg = \App\Models\PgListing::find($pg_id);
    
    if (!$pg) {
        return response()->json([
            'success' => false,
            'message' => 'PG listing not found'
        ], 404);
    }
    
    // Compare the IDs (both as strings and as integers)
    $match_string = $pg->user_id === $user_id;
    $match_int = (int)$pg->user_id === (int)$user_id;
    $loose_match = $pg->user_id == $user_id;
    
    return response()->json([
        'success' => true,
        'pg_listing' => [
            'id' => $pg->id,
            'user_id' => $pg->user_id,
            'user_id_type' => gettype($pg->user_id)
        ],
        'provided_user_id' => $user_id,
        'provided_user_id_type' => gettype($user_id),
        'comparison' => [
            'strict_equality' => $match_string ? 'Match' : 'No match',
            'integer_equality' => $match_int ? 'Match' : 'No match',
            'loose_equality' => $loose_match ? 'Match' : 'No match'
        ]
    ]);
});

// For debugging purposes only - to check the request content
Route::post('/debug-request', function (Request $request) {
    \Log::info('Debug request received', [
        'method' => $request->method(),
        'path' => $request->path(),
        'headers' => $request->headers->all(),
        'content_type' => $request->header('Content-Type'),
        'has_files' => $request->hasFile('images'),
        'all_input' => $request->all()
    ]);
    
    return response()->json([
        'success' => true,
        'message' => 'Request received and logged',
        'data' => [
            'method' => $request->method(),
            'path' => $request->path(),
            'content_type' => $request->header('Content-Type'),
            'has_files' => $request->hasFile('images') ? 'yes' : 'no',
        ]
    ]);
});