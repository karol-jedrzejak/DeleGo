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
        Schema::create('delegations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('company_id')->nullable()->constrained('companies');
            $table->foreignId('car_id')->nullable()->constrained('cars');

            $table->text('description');

            $table->integer('distance');

            $table->float('hotel', 7, 2)->nullable();
            $table->float('highways', 7, 2)->nullable();
            $table->float('fuel', 7, 2)->nullable();
            $table->float('travel_costs', 7, 2)->nullable();
            $table->float('advance_cash', 7, 2)->nullable();

            $table->dateTime('departure');
            $table->dateTime('return');

            $table->boolean('paid');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delegations');
    }
};
