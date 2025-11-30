<?php

// app/Models/SharingType.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SharingType extends Model
{
    use HasFactory;

    protected $fillable = ['pg_listing_id', 'type', 'rent', 'enabled'];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    public function pgListing()
    {
        return $this->belongsTo(PgListing::class);
    }
}