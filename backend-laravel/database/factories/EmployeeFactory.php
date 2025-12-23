<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Dyrektor',
            'Spawalnik',
            'Zastępca Kierownika',
            'Właściciel',
            'Kierownik',
            null
        ];

        $academic_titles_before = [
            'mgr',
            'inż.',
            'mgr inż',
            'dr',
            null
        ];

        $academic_titles_after = [
            '(IWE)',
            '(EWE)',
            null
        ];

        return [
            'name' => fake()->firstName(),
            'surname' => fake()->lastName(),

            'position' => fake()->randomElement($titles),
            'academic_titles_before' => fake()->randomElement($academic_titles_before),
            'academic_titles_after' => fake()->randomElement($academic_titles_after),

            'phone_mobile' => fake()->e164PhoneNumber(),
            'phone_landline' => fake()->phoneNumber(),
            'email' => fake()->email(),

            'birth_date' => fake()->dateTimeBetween('-90 years', '-18 years'),
            'birth_place' => fake()->city(),

            'pesel' => fake()->pesel(),
            'passport' => fake()->randomElement(["PS".fake()->numberBetween(10000000, 99999999),null]),
            'id_card' => fake()->randomElement(["ID".fake()->numberBetween(10000000, 99999999),null]),

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
