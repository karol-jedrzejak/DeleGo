<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Region;
use App\Models\PerDiemRegionRate;

class PerDiemRegionRateSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/data/per_diem_region_rates_2023_01_01.json'));
        $data = json_decode($json, true);

        foreach ($data['rates'] as $rate) {

            $region = Region::where('region_name', $rate['region_name'])->first();
            $region_id = $region ? $region->id : null;

            if($region_id) {
                PerDiemRegionRate::Create([
                    'region_id' => $region_id,
                    'daily_allowance' => $rate['daily_allowance'],
                    'accommodation_limit' => $rate['accommodation_limit'],
                    'valid_from' => $data['valid_from'],
                    'valid_to' => $data['valid_to'],
                ]);
            }
        }
    }
}
