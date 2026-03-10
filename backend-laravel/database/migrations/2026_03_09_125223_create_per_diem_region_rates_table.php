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
        Schema::create('per_diem_region_rates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('region_id')->constrained('regions');

            $table->decimal('daily_allowance', 10, 2); // dieta dzienna
            $table->decimal('accommodation_limit', 10, 2); // limit noclegu

            $table->date('valid_from');
            $table->date('valid_to')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('per_diem_region_rates');
    }
};
