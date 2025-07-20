<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

/**
 * This controller is for future implementation of PG-specific functionality
 * that's not directly related to PG listings themselves.
 * 
 * Note: For most PG operations, use PgListingController instead.
 */
class PGController extends Controller
{
    /**
     * Reserved for future implementation of PG-specific functionality
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'This endpoint has been moved to PgListingController',
            'note' => 'Please update your API calls to use the new endpoint'
        ], 301);
    }
}
