<?php

// app/Models/NearbyPlace.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NearbyPlace extends Model
{
    use HasFactory;

    protected $fillable = ['pg_listing_id', 'place'];

    public function pgListing()
    {
        return $this->belongsTo(PgListing::class);
    }
}
