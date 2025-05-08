<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PG extends Model
{
    protected $fillable = [
        'name',
        'address',
        'city',
        'price',
        'rating',
        'type',
        'amenities',
        'images',
        'room_types',
        'occupancy',
        'user_id',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'room_types' => 'array',
        'occupancy' => 'array',
        'price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];
    protected $table = 'pgs';
}