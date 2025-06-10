<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePgListingsTable extends Migration
{
    public function up()
    {
        Schema::create('pg_listings', function (Blueprint $table) {
            $table->id();
            $table->string('pg_name');
            $table->text('address');
            $table->string('category');
            $table->string('preferred_for');
            $table->string('city');
            $table->string('area');
            $table->string('phone_number');
            $table->string('whatsapp_number')->nullable();
            $table->decimal('security_deposit', 10, 2);
            $table->integer('notice_period');
            $table->boolean('refundable_on_exit');
            $table->string('youtube_link')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pg_listings');
    }
}
