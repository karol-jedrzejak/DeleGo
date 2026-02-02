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
     * Store a newly created resource in storage.
     */
    public function store(DelegationRequest $request)
    {
    $data = $request->validated();

        return DB::transaction(function () use ($data) {

            $year = now()->year;
            $number = Delegation::where('year', $year)->max('number') + 1;

            $delegation = Delegation::create([
                'number' => $number,
                'year' => $year,
                'user_id' => $data['user_id'],
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

        return new DelegationShowResource($delegation);
    }

    /**
     * Display the specified resource.
     */
    public function trip_options()
    {
        $query = DelegationTripType::query()
            ->select(['id', 'name','requires_car','requires_description'])
            ->orderBy('name')
            ->get();
        return DelegationTripTypeShowResource::collection($query);
    }

    /**
     * Display the specified resource.
     */
    public function bill_options()
    {
        $query = DelegationBillType::query()
            ->select(['id', 'name'])
            ->orderBy('name')
            ->get();
        return DelegationBillTypeShowResource::collection($query);
    }

    /**
     * Display the specified resource.
     */
    public function pdf(Delegation $delegation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Delegation $delegation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Delegation $delegation)
    {
        //
    }
}
