<?php

// app/Models/Image.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['pg_listing_id', 'path'];

    public function pgListing()
    {
        return $this->belongsTo(PgListing::class);
    }
}
