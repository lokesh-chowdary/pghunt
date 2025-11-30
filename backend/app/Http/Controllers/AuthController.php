<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed', // 'confirmed' ensures password_confirmation matches
            'phone_number' => 'nullable|string|regex:/^[0-9]{10}$/',
            'user_type' => 'required|in:owner,seeker',
        ]);

        // Create a new user in the database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'user_type' => $request->user_type,
        ]);

        // Generate a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return response
        return response()->json([
            'success' => true,
            'message' => 'User registered successfully!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'user_type' => $user->user_type,
            ],
            'token' => $token,
        ], 201);
    }
    public function login(Request $request)
    {
        // Validate the request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Attempt to log in the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login credentials.',
            ], 401);
        }

        // Retrieve the authenticated user
        $user = Auth::user();

        // Generate a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the user and token
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'user_type' => $user->user_type,
            ],
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ], 200);
    }

    public function user(Request $request)
    {
        // Return the authenticated user
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'phone_number' => $request->user()->phone_number,
                'user_type' => $request->user()->user_type,
            ],
        ], 200);
    }
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->email;

        // Check if user exists (but don't reveal in response for security)
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid email address'], 400);
        }

        // Generate and store reset token (Laravel's default table: password_reset_tokens)
        $token = \Illuminate\Support\Str::random(60); // Secure random token

        // Delete any old tokens for this user
        \DB::table('password_reset_tokens')->where('email', $email)->delete();

        // Store new token
        \DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => hash('sha256', $token), // Hash the token for storage (Laravel standard)
            'created_at' => now(),
        ]);

        // Send email (use a Mailable or simple Mail::raw)
        $resetUrl = config('app.frontend_url', 'http://localhost:3000') . '/reset-password?token=' . $token . '&email=' . urlencode($email);

        try {
            \Mail::raw("Click here to reset your password: {$resetUrl}\nThis link expires in 1 hour.", function ($message) use ($email) {
                $message->to($email)
                        ->subject('Password Reset Request');
            });
        } catch (\Exception $e) {
            \Log::error('Failed to send reset email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send reset link. Please try again.'], 500);
        }

        return response()->json(['message' => 'Password reset link sent to your email'], 200);
    }
}