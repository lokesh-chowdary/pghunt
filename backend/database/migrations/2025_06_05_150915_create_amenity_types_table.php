<?php

// database/migrations/2025_06_05_000003_create_amenity_types_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmenityTypesTable extends Migration
{
    public function up()
    {
        Schema::create('amenity_types', function (Blueprint $table) {
            $table->id();
            $table->string('amenity_id')->unique(); // e.g., wifi
            $table->string('name'); // e.g., WiFi
            $table->string('icon')->nullable(); // e.g., 📶
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('amenity_types');
    }
}
