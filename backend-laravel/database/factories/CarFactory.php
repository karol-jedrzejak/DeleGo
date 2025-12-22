<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = [
            'Volkswagen',
            'Porsche',
            'Fiat',
            'Ford',
            'Hyundai',
            'Toyota',
            'Subaru',
            'Alfa Romeo',
        ];
        $numb = strtoupper(fake()->randomLetter().fake()->randomLetter().fake()->randomLetter()).str_pad(fake()->numberBetween(0, 99999), 5, '0', STR_PAD_LEFT);

        return [
            'brand' => fake()->randomElement($brands),
            'model' => fake()->word(),
            'registration_number' => $numb,
            'active' => fake()->numberBetween(0, 1),
        ];
    }
}
