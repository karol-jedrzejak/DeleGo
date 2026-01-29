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
        Schema::create('delegation_bills', function (Blueprint $table) {
            $table->id();

            $table->string('currency_code'); // typ zgodny z kolumną currencies.code
            $table->foreign('currency_code') // nazwa kolumny w tej tabeli
                ->references('code')       // kolumna w tabeli currencies
                ->on('currencies');         // tabela docelowa

            $table->foreignId('delegation_id')->constrained('delegations');
            $table->foreignId('delegation_bill_type_id')->constrained('delegation_bill_types');

            $table->text('description');
            $table->float('amount', 7, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delegation_bills');
    }
};
