<?php

use Illuminate\Support\Facades\Route;

<<<<<<< HEAD
// Serve React app only for the root URL
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '^(?!api).*$');
=======
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


// Basic login route that just returns a view or redirects to SPA
Route::get('/login', function() {
    return redirect()->to('http://localhost:5173/login');
})->name('login');
>>>>>>> origin/lokesh-dev
