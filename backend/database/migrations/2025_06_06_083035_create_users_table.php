<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->string('phone_number')->nullable();
                $table->enum('user_type', ['owner', 'seeker'])->default('owner'); // owner = PG owner, seeker = PG seeker
                $table->rememberToken();
                $table->timestamps();
            });
        } else {
            // Add missing columns if they don't exist
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'phone_number')) {
                    $table->string('phone_number')->nullable()->after('password');
                }
                if (!Schema::hasColumn('users', 'user_type')) {
                    $table->enum('user_type', ['owner', 'seeker'])->default('owner')->after('phone_number');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
