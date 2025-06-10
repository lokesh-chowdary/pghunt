<?php

// app/Models/AmenityType.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AmenityType extends Model
{
    use HasFactory;

    protected $fillable = ['amenity_id', 'name', 'icon'];

    public function amenities()
    {
        return $this->hasMany(Amenity::class);
    }
}