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
        Schema::create('delegation_trips', function (Blueprint $table) {
            $table->id();

            $table->foreignId('delegation_id')->constrained('delegations');
            $table->foreignId('delegation_trip_type_id')->constrained('delegation_trip_types');

            $table->foreignId('car_id')->nullable()->constrained('cars');
            $table->integer('distance')->nullable();
            
            $table->text('custom_transport')->nullable();

            $table->text('starting_point');
            $table->text('destination');

            $table->text('description');


            $table->dateTime('departure');
            $table->dateTime('arrival');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delegation_trips');
    }
};
