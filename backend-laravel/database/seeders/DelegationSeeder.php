<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;
use App\Models\Currency;
use App\Models\Delegation;
use App\Models\DelegationBill;
use App\Models\DelegationBillType;
use App\Models\DelegationTrip;
use App\Models\DelegationTripType;
use App\Models\DelegationStatusHistory;

class DelegationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status_types = [
            'draft',
            'submitted',
            'approved',
            'rejected',
            'pdf_ready'
            ];

        Delegation::factory()
            ->count(100)
            ->create()
            ->each(function ($delegation) {

                $currency = fake()->boolean(80) ? "PLN" : Currency::inRandomOrder()->first()->code;

                // Liczba tripów 0-4
                $tripsCount = rand(2,4);

                // Zakres dat dla tripów
                $dates_array = [];
                $min_date = fake()->dateTimeBetween('-2 years', 'now');
                $max_date = fake()->dateTimeBetween($min_date, '+14 days');

                // Wybór typu transportu
                $transport =  DelegationTripType::inRandomOrder()->first();

                $car_id = null;
                if($transport->requires_car) {
                    // Wybór car_id dla usera delegacji lub null (służbowe)
                    $user_id = $delegation->user_id;
                    $car = Car::where('user_id', $user_id)->orWhere('user_id', null)->inRandomOrder()->first();
                    $car_id = $car ? $car->id : null;
                }

                // Customowy transport (np samolot, pociąg)
                $custom_transport = null;
                if($transport->requires_description) {
                    $custom_transport = fake()->sentence();
                }

                for ($i=0; $i<$tripsCount; $i++) {
                    // Daty trip w zakresie delegacji i z niepokrywającymi się datami
                    if($i==0) {
                        $departure = fake()->dateTimeBetween($min_date, $max_date);
                        $arrival = fake()->dateTimeBetween($departure, $max_date);
                    } else {
                        $departure = fake()->dateTimeBetween($dates_array[$i-1]['arrival'], $max_date);
                        $arrival = fake()->dateTimeBetween($departure, $max_date);
                    }
                    $dates_array[] = ['departure' => $departure, 'arrival' => $arrival];

                    DelegationTrip::factory()->create([
                        'delegation_id' => $delegation->id,
                        'car_id' => $car_id,
                        'delegation_trip_type_id' => $transport->id,
                        'custom_transport' => $custom_transport,
                        'departure' => $departure,
                        'arrival' => $arrival,
                    ]);
                }

                $start = $dates_array[0]['departure']->format('Y-m-d');
                $end = $dates_array[$tripsCount-1]['arrival']->format('Y-m-d');

                // Liczba rachunków 0-4
                $billsCount = rand(0,4);
                for ($i=0; $i<$billsCount; $i++) {
                    DelegationBill::factory()->create([
                        'currency_code' => $currency,
                        'delegation_id' => $delegation->id,
                        'date' => fake()->dateTimeBetween($start,$end),
                        'delegation_bill_type_id' => DelegationBillType::inRandomOrder()->first()->id,
                    ]);
                }

                // Draft //

                DelegationStatusHistory::factory()->create([
                    'delegation_id' => $delegation->id,
                    'changed_by' => $delegation->user_id,
                    'from_status' => null,
                    'to_status' => 'draft',
                    'comment' => null,
                ]);

                // Submitted //
                if (!in_array($delegation->status, ['draft'])) {
                    DelegationStatusHistory::factory()->create([
                        'delegation_id' => $delegation->id,
                        'changed_by' => $delegation->user_id,
                        'from_status' => 'draft',
                        'to_status' => 'submitted',
                        'comment' => null,
                    ]);
                }
                
                // Approved //
                if (!in_array($delegation->status, ['draft','submitted','rejected'])) {
                    DelegationStatusHistory::factory()->create([
                        'delegation_id' => $delegation->id,
                        'changed_by' => 1,
                        'from_status' => 'submitted',
                        'to_status' => 'approved',
                        'comment' => null,
                    ]);
                }

                // Rejected //
                if (!in_array($delegation->status, ['draft','submitted','approved'])) {
                    DelegationStatusHistory::factory()->create([
                        'delegation_id' => $delegation->id,
                        'changed_by' => 1,
                        'from_status' => 'submitted',
                        'to_status' => 'rejected',
                        'comment' => fake()->sentence(6),
                    ]);
                }

                // Pdf Ready //
                // To be created


            });
    }
}
