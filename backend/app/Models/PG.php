<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PG extends Model
{
    use HasFactory;

    protected $table = 'pgs'; 

    protected $fillable = [
        'name',
        'address',
        'city',
        'price',
        'rating',
        'type',
        'amenities',
        'room_types',
        'occupancy',
        'images',
    ];
}