<?php

// database/migrations/2025_06_05_000002_create_sharing_types_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSharingTypesTable extends Migration
{
    public function up()
    {
        Schema::create('sharing_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pg_listing_id')->constrained()->onDelete('cascade');
            $table->string('type'); // e.g., single, double
            $table->decimal('rent', 10, 2);
            $table->boolean('enabled')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sharing_types');
    }
}
