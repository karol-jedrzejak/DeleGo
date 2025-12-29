<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

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

        $firstName = fake()->firstName();
        $lastName  = fake()->lastName();

        $baseEmail = Str::lower(
            Str::ascii($firstName . '.' . $lastName)
        );

        $email = $baseEmail . '@gmail.com';

        // 🔁 sprawdzaj unikalność w DB
        $counter = 1;
        while (\App\Models\User::where('email', $email)->exists()) {
            $email = $baseEmail . $counter . '@gmail.com';
            $counter++;
        }

        return [
            'name' => $firstName,
            'surname' => $lastName,
            'position' => fake()->randomElement($titles),
            'phone_mobile' => fake()->e164PhoneNumber(),
            'phone_landline' => fake()->phoneNumber(),
            'academic_titles_before' => fake()->randomElement(['mgr. inż.', 'inż',null]),
            'academic_titles_after' => fake()->randomElement(['(IWE)', '(EWE)', null]),
            'email' => $email,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'active' => 1,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
