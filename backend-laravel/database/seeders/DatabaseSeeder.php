<?php

namespace Database\Seeders;

//use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionTypeSeeder::class,
            UserSeeder::class,
            CompanySeeder::class,
            CarSeeder::class,
            CurrencySeeder::class,
            DelegationBillTypeSeeder::class,
            DelegationTripTypeSeeder::class,
            DelegationSeeder::class,
        ]);
    }
}
