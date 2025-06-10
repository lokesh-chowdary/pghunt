<?php

return [
    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'paths' => ['api/*', 'pgs/*', '*'], // Allow all paths or specific ones
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'], // Your frontend URL
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
