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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies');

            $table->string('name');
            $table->string('surname');

            $table->string('position')->nullable();
            $table->string('academic_titles_before')->nullable();
            $table->string('academic_titles_after')->nullable();

            $table->string('phone_mobile')->nullable();
            $table->string('phone_landline')->nullable();
            $table->string('email')->nullable();

            $table->date('birth_date')->nullable();
            $table->string('birth_place')->nullable();

            $table->char('pesel', length: 12)->nullable();
            $table->string('passport')->nullable();
            $table->string('id_card')->nullable();

            $table->index(['company_id', 'surname', 'name'], 'idx_emp_comp_sur_name');

            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
