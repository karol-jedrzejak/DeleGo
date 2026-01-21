<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DelegationTripType;

class DelegationTripTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $types = [
            [
                'name' => 'Auto',
                'requires_car' => true,
                'requires_description' => false
            ],
            [
                'name' => 'Pociąg',
                'requires_car' => false,
                'requires_description' => true
            ],
            [
                'name' => 'Samolot',
                'requires_car' => false,
                'requires_description' => true
            ],
            [
                'name' => 'Inne',
                'requires_car' => false,
                'requires_description' => true
            ],
        ];

        foreach ($types as $type) {
            DelegationTripType::create($type);
        }
    }
}
