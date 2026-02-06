<?php

namespace App\Http\Controllers\API\Delegation;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;

use App\Models\Delegation;
use App\Models\DelegationBillType;
use App\Models\DelegationTripType;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Http\Resources\Delegation\DelegationIndexResource;
use App\Http\Resources\Delegation\DelegationShowResource;

use App\Http\Resources\Delegation\DelegationBillTypeShowResource;
use App\Http\Resources\Delegation\DelegationTripTypeShowResource;

use App\Http\Requests\User\DelegationRequest;

use App\Services\Delegation\DelegationCostCalculator;


class DelegationController extends Controller
{
    use AuthorizesRequests;
    public function __construct()
    {
        $this->authorizeResource(Delegation::class,'delegation');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Wczytanie maxymalnej i minimalnej daty z podmodelu delegationTrips
        $query = Delegation::filter($request)
        ->withMin('delegationTrips as departure', 'departure')
        ->withMax('delegationTrips as return', 'arrival');

        // razem z modelem user jeśli admin
        if ($user->isAdmin()) {
            $query->with('user');
        } else{
            $query->where('user_id', $user->id);
        }

        // Z submodelami
        $query->with([
            'company:id,name_short',
        ]);

        $items = $query->paginate($request->query('perPage', 10));

        return DelegationIndexResource::collection($items)->withPath('');
    }

    /**
     * Display the specified resource.
     */
    public function show(Delegation $delegation)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // razem z modelem user jeśli admin + dopisanie dat
        if ($user->isAdmin()) {
            $delegation->load('user');
        }

        $delegation
        ->loadMin('delegationTrips as departure', 'departure')
        ->loadMax('delegationTrips as return', 'arrival');

        $delegation->loadMissing([
            'company:id,name_short,name_complete,street,house_number,city,postal_code,postal_city,region,country',
        ]);

        $delegation->loadMissing([
            'delegationTrips' => function ($q) {
                $q->select([
                    'id',
                    'delegation_id',
                    'arrival',
                    'description',
                    'delegation_trip_type_id',
                    'departure',
                    'destination',
                    'distance',
                    'starting_point',
                    'car_id',
                    'custom_transport',
                ]);
            },
            'delegationTrips.delegationTripType' => function ($q) {
                $q->select([
                    'id',
                    'name',
                    'requires_car',
                    'requires_description',
                ]);
            },
            'delegationTrips.car' => function ($q) {
                $q->select([
                    'id',
                    'registration_number',
                    'brand',
                    'model',
                ]);
            },
        ]);

        $delegation->loadMissing([
            'delegationBills' => function ($q) {
                $q->select([
                    'id',
                    'delegation_id',
                    'date',
                    'amount',
                    'currency_code',
                    'description',
                    'delegation_bill_type_id',
                ]);
            },
            'delegationBills.delegationBillType' => function ($q) {
                $q->select([
                    'id',
                    'name',
                ]);
            },
            'delegationBills.currency' => function ($q) {
                $q->select([
                    'code',
                    'name',
                    'symbol',
                ]);
            },
        ]);

        $delegation->loadMissing([
            'delegationStatusHistories' => function ($q) {
                $q->select([
                    'id',
                    'delegation_id',
                    'changed_by',
                    'from_status',
                    'to_status',
                    'comment',
                    'created_at'
                ])->orderBy('id','desc');
            },
            'delegationStatusHistories.changer' => function ($q) {
                $q->select([
                    'id',
                    'name',
                    'surname',
                ]);
            },
        ]);

        return new DelegationShowResource($delegation);
    }

    /**
     * Display the specified resource.
     */
    public function pdf(Delegation $delegation)
    {
        //
/* 
        $currencyCode = $request->get('currency', 'PLN');

        $calculator = app(DelegationCostCalculator::class);

        $summary = $calculator->calculate($delegation, $currencyCode);

        return new DelegationResource($delegation, $summary); */

    }

    /**
     * Get form options.
     */
    public function options()
    {
        return response()->json([
            'tripTypes' => DelegationTripTypeShowResource::collection(
                DelegationTripType::query()
                    ->select(['id', 'name', 'requires_car', 'requires_description'])
                    ->orderBy('name')
                    ->get()
            ),
            'billTypes' => DelegationBillTypeShowResource::collection(
                DelegationBillType::query()
                    ->select(['id', 'name'])
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DelegationRequest $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $data = $request->validated();

        return DB::transaction(function () use ($data,$user) {

            if($data['user_id'])
            {
                $user_id = $data['user_id'];
            } else {
                $user_id = $user->id;
            }
            
            $year = now()->year;
            $number = Delegation::where('year', $year)->max('number') + 1;

            $delegation = Delegation::create([
                'number' => $number,
                'year' => $year,
                'user_id' => $user_id,
                'company_id' => $data['company_id'] ?? null,
                'custom_address' => $data['custom_address'] ?? null,
                'description' => $data['description'],
                'settled' => $data['settled'],
            ]);

            $delegation->delegationTrips()->createMany($data['delegation_trips']);
            $delegation->delegationBills()->createMany($data['delegation_bills']);

            return response()->json([
                'text' => 'Poprawnie dodano Delegacje',
                'type' => 'message',
                'status' => 'success',
                'id' => $delegation->id,
            ],201);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DelegationRequest $request, Delegation $delegation)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $data = $request->validated();

        return DB::transaction(function () use ($data, $user, $delegation) {

            // user_id
            $user_id = $data['user_id'] ?? $user->id;

            // === Aktualizacja głównego rekordu ===
            $delegation->update([
                'user_id' => $user_id,
                'company_id' => $data['company_id'] ?? null,
                'custom_address' => $data['custom_address'] ?? null,
                'description' => $data['description'],
                'settled' => $data['settled'],
            ]);

            // === Delegation Trips ===
            $tripIds = [];
            foreach ($data['delegation_trips'] as $trip) {
                if (isset($trip['id'])) {
                    // update istniejącego
                    $delegation->delegationTrips()->where('id', $trip['id'])->update($trip);
                    $tripIds[] = $trip['id'];
                } else {
                    // nowy
                    $newTrip = $delegation->delegationTrips()->create($trip);
                    $tripIds[] = $newTrip->id;
                }
            }

            // usuń te, które nie wystąpiły w formularzu
            $delegation->delegationTrips()->whereNotIn('id', $tripIds)->delete();

            // === Delegation Bills ===
            $billIds = [];
            foreach ($data['delegation_bills'] ?? [] as $bill) {
                if (isset($bill['id'])) {
                    $delegation->delegationBills()->where('id', $bill['id'])->update($bill);
                    $billIds[] = $bill['id'];
                } else {
                    $newBill = $delegation->delegationBills()->create($bill);
                    $billIds[] = $newBill->id;
                }
            }

            // usuń brakujące
            $delegation->delegationBills()->whereNotIn('id', $billIds)->delete();

            return response()->json([
                'text' => 'Poprawnie zaktualizowano Delegację',
                'type' => 'message',
                'status' => 'success',
                'id' => $delegation->id,
            ]);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Delegation $delegation)
    {
        return DB::transaction(function () use ($delegation) {

            $text = $delegation->number."/".$delegation->year;

            // usuń powiązane trips
            $delegation->delegationTrips()->delete();

            // usuń powiązane bills
            $delegation->delegationBills()->delete();

            // usuń samą delegację
            $delegation->delete();

            return response()->json([
                'text' => 'Delegacja została usunięta wraz z powiązanymi przejazdami i rachunkami.',
                'type' => 'message',
                'status' => 'success',
            ]);
        });
    }
}
