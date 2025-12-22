<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PermissionType;

class PermissionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $types = [
            [
                'resource' => 'admin',
                'department' => 'admin'
            ],
            [
                'resource' => 'companies',
                'department' => 'misc'
            ],
            [
                'resource' => 'employees',
                'department' => 'misc'
            ]
        ];

        foreach ($types as $type) {
            PermissionType::create($type);
        }
    }
}
