<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Region;

class RegionSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/data/per_diem_region_rates_2023_01_01.json'));
        $data = json_decode($json, true);

        foreach ($data['rates'] as $rate) {
            Region::Create([
                'region_name' => $rate['region_name'],
                'country_name' => $rate['country_name'],
                'currency_code' => $rate['currency'],    
            ]);
        }
    }
}
