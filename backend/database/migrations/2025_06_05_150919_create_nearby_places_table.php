<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNearbyPlacesTable extends Migration
{
    public function up()
    {
        Schema::create('nearby_places', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pg_listing_id')->constrained()->onDelete('cascade');
            $table->string('place');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('nearby_places');
    }
}
