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

        $status_types = [
            'draft',
            'submitted',
            'approved',
            'rejected',
            /* 'pdf_ready' */
            ];
        $status = fake()->randomElement($status_types);

        $status_types_settled_enable = [
            'approved',
            'pdf_ready'
        ];

        $settled = false;
        if(in_array($status,$status_types_settled_enable))
        {
            $settled = fake()->boolean(50);
        }

        // Losowy company_id lub null
        $company = Company::inRandomOrder()->first();
        $company_id = fake()->boolean(70) && $company ? $company->id : null; // 80% szans, że będzie company

        // custom address jeśli brak company
        $custom_address = $company_id ? null : fake()->address();

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
            'company_id' => $company_id,
            'custom_address' => $custom_address,
            'description' => fake()->sentence(),
            'status' => $status,
            'settled' => $settled, // 20% szans, że settled
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
