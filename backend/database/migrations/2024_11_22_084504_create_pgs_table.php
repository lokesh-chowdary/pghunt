<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePgsTable extends Migration
{
    public function up()
    {
        Schema::create('pgs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('address');
            $table->string('city');
            $table->decimal('price', 10, 2);
            $table->decimal('rating', 3, 1);
            $table->enum('type', ['male', 'female', 'unisex']);
            $table->json('amenities');
            $table->string('room_types');
            $table->string('occupancy');
            $table->json('images');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pgs');
    }
}