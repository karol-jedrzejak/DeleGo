<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use PhpParser\Node\Expr\NullsafeMethodCall;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company();
        $city = fake()->city();

        return [

            'nip' => fake()->unique()->taxpayerIdentificationNumber(),
            'krs' => fake()->unique()->taxpayerIdentificationNumber(),
            'regon' => fake()->randomElement([fake()->unique()->regon(),fake()->unique()->regonLocal()]),
            
            'name_short' => $name,
            'name_complete' => $name . ' ' . fake()->companySuffix(),

            'street' => fake()->streetName(),
            'house_number' => fake()->numberBetween(1, 250),
            'city' => $city,
            'postal_code' => fake()->numberBetween(10000, 99999),
            'postal_city' => $city,

            'region' => fake()->state(),
            'country' => fake()->country(),

            'latitude' => fake()->latitude($min = 35, $max = 48),
            'longitude' => fake()->longitude($min = -120, $max = -95),

            'distance' => null,
            'distance_time' => null,

            'active' => fake()->numberBetween(0, 1),

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
