<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Direct route for testing API issues
Route::get('/test-listings', function () {
    $routes = Route::getRoutes();
    $routeList = [];
    
    foreach ($routes as $route) {
        if (str_contains($route->uri, 'pgs') || str_contains($route->uri, 'user-listings')) {
            $routeList[] = [
                'uri' => $route->uri,
                'methods' => $route->methods,
                'action' => $route->getActionName()
            ];
        }
    }
    
    return response()->json([
        'success' => true,
        'message' => 'Direct web route test for listings',
        'routes' => $routeList,
        'server' => [
            'request_uri' => request()->getRequestUri(),
            'base_url' => url('/'),
            'api_url' => url('/api')
        ]
    ]);
});

// Basic login route that just returns a view or redirects to SPA
Route::get('/login', function() {
    return redirect()->to('http://localhost:5173/login');
})->name('login');
