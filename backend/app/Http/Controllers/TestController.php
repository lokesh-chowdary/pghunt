<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    /**
     * Simple test endpoint
     */
    public function test(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Test endpoint working!',
            'time' => now()->toDateTimeString()
        ]);
    }
}