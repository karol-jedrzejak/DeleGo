<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\Company\CompanyIndexResource;
use App\Http\Resources\User\UserBasicResource;
use App\Http\Resources\Delegation\DelegationBillShowResource;
use App\Http\Resources\Delegation\DelegationTripShowResource;

class DelegationShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return [
            'id' => $this->id,
            'number' => [
                'number' => $this->number,
                'year' => $this->year,
            ],
            'status' => $this->status,
            'settled' => $this->settled,
            'dates' => [
                'departure' => $this->departure,
                'return' => $this->return,
            ],
            'custom_address' => $this->custom_address,
            'description' => $this->description,
            
            // belongsTo
            'user' => $user?->isAdmin()
                ? new UserBasicResource($this->user)
                : null,
            'company' => $this->whenLoaded('company', function () {
                if ($this->company && $this->company->id) {
                    return new CompanyIndexResource($this->company);
                }
                return null;
            }),

            // hasMeany
/*             'delegation_trips' => DelegationTripShowResource::collection(
                $this->whenLoaded('delegationTrips')
            ),
            'delegation_bills' => DelegationBillShowResource::collection(
                $this->whenLoaded('delegationBills')
            ), */

            // hasMeany - alternative null if empty
            'delegation_trips' => $this->whenLoaded('delegationTrips', function () {
                return $this->delegationTrips->isNotEmpty()
                ? DelegationTripShowResource::collection($this->delegationTrips)
                : null;
            }),
            'delegation_bills' => $this->whenLoaded('delegationBills', function () {
                return $this->delegationBills->isNotEmpty()
                ? DelegationBillShowResource::collection($this->delegationBills)
                : null;
            }),

            'delegation_status_history' => $this->whenLoaded('delegationStatusHistories', function () {
                return DelegationStatusHistoryShowResource::collection($this->delegationStatusHistories);
            }),
        ];
    }
}
