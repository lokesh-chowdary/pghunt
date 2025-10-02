<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            // For API routes, don't try to redirect to login
            if (str_starts_with($request->path(), 'api/')) {
                abort(401, 'Unauthenticated');
            }
            
            // Otherwise, redirect to frontend login page (if you have one)
            return '/login'; // Using a direct path instead of route name
        }
    }
}
