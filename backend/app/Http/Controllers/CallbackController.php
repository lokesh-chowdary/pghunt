<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CallbackController extends Controller
{
    public function send(Request $request)
    {

        // Validate request input
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'mobile_number' => 'required|string|max:20',
            'callback_within' => 'required|string',
            'email' => 'nullable|email', // optional
        ]);

        // Get admin email from env
        $adminEmail = env('MAIL_TO_ADDRESS');
        if (!$adminEmail) {
            return response()->json(['error' => 'Admin email is not configured'], 500);
        }

        // Prepare email content
        $messageBody = "
        New Callback Request 📞

        Name: {$data['name']}
        Mobile Number: {$data['mobile_number']}
        Callback Time: {$data['callback_within']}
        Email: " . ($data['email'] ?? 'N/A') . "
        ";

        // Send email to admin
        Mail::raw($messageBody, function ($message) use ($adminEmail) {
            $message->to($adminEmail)
                    ->subject('New Callback Request');
        });

        return response()->json([
            'message' => 'Callback request sent successfully to admin',
        ]);
    }
}
