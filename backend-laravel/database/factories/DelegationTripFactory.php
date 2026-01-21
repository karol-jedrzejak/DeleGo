<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DelegationTrip>
 */
class DelegationTripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'starting_point' => fake()->address(),
            'destination' => fake()->address(),
            'description' => fake()->sentence(),
            'distance' => fake()->numberBetween(1, 999),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
