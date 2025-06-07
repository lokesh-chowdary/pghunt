<?php

// app/Models/PgListing.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PgListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pg_name',
        'address',
        'category',
        'preferred_for',
        'city',
        'area',
        'phone_number',
        'whatsapp_number',
        'security_deposit',
        'notice_period',
        'refundable_on_exit',
        'youtube_link',
    ];

    protected $casts = [
        'refundable_on_exit' => 'boolean',
    ];

    public function sharingTypes()
    {
        return $this->hasMany(SharingType::class);
    }

    public function amenities()
    {
        return $this->hasMany(Amenity::class);
    }

    public function nearbyPlaces()
    {
        return $this->hasMany(NearbyPlace::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
