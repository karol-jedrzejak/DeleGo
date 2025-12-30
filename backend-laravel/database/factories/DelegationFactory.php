<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Car;
use App\Models\Company;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Delegation>
 */
class DelegationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected static array $usedNumberYear = [];

    public function definition(): array
    {
        // Wybór losowego usera
        $user_id = User::inRandomOrder()->first()->id ?? 1;

        // Losowy car_id lub null
        $car = Car::inRandomOrder()->first();
        $car_id = fake()->boolean(70) && $car ? $car->id : null; // 70% szans, że będzie car

        // Losowy company_id lub null
        $company = Company::inRandomOrder()->first();
        $company_id = fake()->boolean(80) && $company ? $company->id : null; // 80% szans, że będzie company

        // custom address jeśli brak company
        $custom_address = $company_id ? null : fake()->address();

        // total_distance > 0 i < 1000
        $total_distance = fake()->numberBetween(1, 999);

        // random departure i return w ostatnich 10 latach
        $departure = fake()->dateTimeBetween('-10 years', 'now');
        $return = fake()->dateTimeBetween($departure, '+10 days');

        // unique number+year – używamy closure
        do {
            $year = fake()->year();
            $number = fake()->numberBetween(1, 999);
            $pair = $number . '/' . $year;
        } while (in_array($pair, self::$usedNumberYear));

        self::$usedNumberYear[] = $pair;

        return [
            'number' => $number,
            'year' => $year,
            'user_id' => $user_id,
            'car_id' => $car_id,
            'company_id' => $company_id,
            'custom_address' => $custom_address,
            'description' => fake()->sentence(),
            'total_distance' => $total_distance,
            'departure' => $departure,
            'return' => $return,
            'settled' => fake()->boolean(20), // 20% szans, że settled
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
