<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DelegationBillType;

class DelegationBillTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $types = [
            [
                'name' => 'hotel',
            ],
            [
                'name' => 'advance_cash',
            ],
            [
                'name' => 'other',
            ],
        ];

        foreach ($types as $type) {
            DelegationBillType::create($type);
        }
    }
}
