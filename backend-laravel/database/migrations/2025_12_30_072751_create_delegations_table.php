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

            $table->unsignedInteger('number');
            $table->unsignedSmallInteger('year');

            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('car_id')->nullable()->constrained('cars');

            $table->foreignId('company_id')->nullable()->constrained('companies');
            $table->string('custom_address')->nullable();

            $table->text('description');
            $table->integer('total_distance');

            $table->dateTime('departure');
            $table->dateTime('return');

            $table->boolean('settled');

            $table->timestamps();

            $table->unique(['number', 'year']);
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
