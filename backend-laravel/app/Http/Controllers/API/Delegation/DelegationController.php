<?php

namespace App\Http\Controllers\API\Delegation;

use App\Http\Controllers\Controller;
use App\Models\Delegation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Http\Resources\Delegation\DelegationIndexResource;
use App\Http\Resources\Delegation\DelegationShowResource;

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

        $query = Delegation::filter($request);

        // razem z modelem user jeśli admin
        if ($user->isAdmin()) {
            $query->with('user');
        } else{
            $query->where('user_id', $user->id);
        }

        // Z submodelami
        $query->with([
            'car:id,registration_number,brand,model',
            'company:id,name_short',
/*             'delegationTrips', */
        ]);

        // delegationBills razem z type
/*         $query->with('delegationBills.delegationBillType'); */

        $items = $query->paginate($request->query('perPage', 10));

        return DelegationIndexResource::collection($items)->withPath('');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Delegation $delegation)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // razem z modelem user jeśli admin
        if ($user->isAdmin()) {
            $delegation->load('user');
        }

        $delegation->load([
            'car:id,registration_number,brand,model',
            'company:id,name_short',
          'delegationTrips',
        ]);

        $delegation->load('delegationBills.delegationBillType');

        return new DelegationShowResource($delegation);
    }

    /**
     * Display the specified resource.
     */
    public function pdf(Delegation $delegation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Delegation $delegation)
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
