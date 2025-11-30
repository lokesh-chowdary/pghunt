<?php

use Illuminate\Support\Facades\Route;

// Serve React app only for the root URL
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '^(?!api).*$');
