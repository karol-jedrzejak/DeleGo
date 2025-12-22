<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Employee;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::factory()
            ->count(20)
            ->has(
                Employee::factory()
                    ->count(26)
                    ->has(
                        Car::factory()->count(2)
                    )
            )
            ->create();
    }
}
