<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifySecurityDepositColumnInPgListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pg_listings', function (Blueprint $table) {
            // Modify security_deposit to handle larger values (up to 99,999,999,999.99)
            $table->decimal('security_deposit', 15, 2)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pg_listings', function (Blueprint $table) {
            // Revert back to original size
            $table->decimal('security_deposit', 10, 2)->change();
        });
    }
}
