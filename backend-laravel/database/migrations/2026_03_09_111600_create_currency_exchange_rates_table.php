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
        Schema::create('currency_exchange_rates', function (Blueprint $table) {
            $table->id();
            $table->char('currency_code', 3);
            $table->foreign('currency_code')
                ->references('code')
                ->on('currencies');
            $table->date('rate_date');
            $table->decimal('rate', 15, 6);
            $table->string('source', 20);
            $table->unique([
                'currency_code',
                'rate_date',
                'source'
            ], 'exchange_rates_unique');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currency_exchange_rates');
    }
};
