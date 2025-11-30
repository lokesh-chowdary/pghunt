<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserProfileController extends Controller
{
    /**
     * Get the authenticated user's profile
     */
    public function getProfile(Request $request): JsonResponse
    {
        Log::info('UserProfileController::getProfile called');
        
        try {
            // Check for auth directly
            if (!Auth::check()) {
                Log::warning('No authenticated user found via Auth::check()');
            }
            
            // Get user from request
            $user = $request->user();
            
            if (!$user) {
                Log::error('No authenticated user found in request');
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            Log::info('User retrieved successfully', ['id' => $user->id]);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_number ?? null,
                    'user_type' => $user->user_type ?? 'owner',
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error getting user profile', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update the authenticated user's profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        Log::info('UserProfileController::updateProfile called');
        
        try {
            // Validate the request
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255|unique:users,email,' . $request->user()->id,
                'phone' => 'sometimes|nullable|string|max:15',
                'current_password' => 'sometimes|required_with:new_password',
                'new_password' => 'sometimes|min:6|confirmed',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            $user = $request->user();
            
            // Update name if provided
            if ($request->has('name') && $request->filled('name')) {
                $user->name = $request->name;
            }
            
            // Update email if provided
            if ($request->has('email') && $request->filled('email')) {
                $user->email = $request->email;
            }
            
            // Update phone if provided
            if ($request->has('phone') && $request->filled('phone')) {
                $user->phone_number = $request->phone;
            }
            
            // Update password if provided
            if ($request->has('new_password') && $request->filled('new_password')) {
                // Verify current password
                if (!Hash::check($request->current_password, $user->password)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is incorrect'
                    ], 422);
                }
                
                $user->password = Hash::make($request->new_password);
            }
            
            $user->save();
            
            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_number ?? null,
                    'user_type' => $user->user_type ?? 'owner',
                    'updated_at' => $user->updated_at,
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error updating user profile', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
