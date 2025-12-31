<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            $table->char('nip', length: 10)->nullable();
            $table->char('krs', length: 10)->nullable();
            $table->char('regon', length: 14)->nullable();

            $table->string('name_short')->unique();
            $table->string('name_complete')->unique();

            $table->string('street')->nullable();
            $table->char('house_number', length: 20);
            $table->string('city');
            $table->string('postal_code');
            $table->string('postal_city');

            $table->string('region');
            $table->string('country');

            $table->float('latitude', 8, 4)->nullable();
            $table->float('longitude', 8, 4)->nullable();

            $table->integer('distance')->nullable();
            $table->float('distance_time')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
