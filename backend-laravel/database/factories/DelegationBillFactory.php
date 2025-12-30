<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Car;
use App\Models\Company;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DelegationBill>
 */
class DelegationBillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            //'delegation_id' => null,
            //'delegation_bill_type_id' => null,
            'description' => fake()->sentence(),
            'amount' => fake()->numberBetween(1, 499),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
