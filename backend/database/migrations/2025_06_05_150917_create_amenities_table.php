<?php

// database/migrations/2025_06_05_000004_create_amenities_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmenitiesTable extends Migration
{
    public function up()
    {
        Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pg_listing_id')->constrained()->onDelete('cascade');
            $table->foreignId('amenity_type_id')->constrained('amenity_types')->onDelete('restrict');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('amenities');
    }
}
