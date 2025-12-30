<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Delegation;
use App\Models\DelegationBill;
use App\Models\DelegationBillType;
use App\Models\DelegationTrip;

class DelegationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Delegation::factory()
            ->count(20)
            ->create()
            ->each(function ($delegation) {

                // Liczba rachunków 0-4
                $billsCount = rand(0,4);
                for ($i=0; $i<$billsCount; $i++) {
                    DelegationBill::factory()->create([
                        'delegation_id' => $delegation->id,
                        'delegation_bill_type_id' => DelegationBillType::inRandomOrder()->first()->id,
                    ]);
                }

                // Liczba tripów 0-4
                $tripsCount = rand(0,4);
                for ($i=0; $i<$tripsCount; $i++) {
                    // Daty trip w zakresie delegacji
                    $departure = fake()->dateTimeBetween($delegation->departure, $delegation->return);
                    $arrival = fake()->dateTimeBetween($departure, $delegation->return);

                    DelegationTrip::factory()->create([
                        'delegation_id' => $delegation->id,
                        'departure' => $departure,
                        'arrival' => $arrival,
                    ]);
                }
            });
    }
}
