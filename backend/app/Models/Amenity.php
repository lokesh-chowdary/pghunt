<?php

// app/Models/Amenity.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    use HasFactory;

    protected $fillable = ['pg_listing_id', 'amenity_type_id'];

    public function pgListing()
    {
        return $this->belongsTo(PgListing::class);
    }

    public function amenityType()
    {
        return $this->belongsTo(AmenityType::class);
    }
}
