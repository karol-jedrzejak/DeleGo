<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Company\CompanyIndexResource;
use App\Http\Resources\User\UserBasicResource;
use App\Http\Resources\User\CarBasicResource;
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
        return [
            'id' => $this->id,
            'number' => [
                'number' => $this->number,
                'year' => $this->year,
            ],
            'settled' => $this->settled,
            'dates' => [
                'return' => $this->return,
                'departure' => $this->departure,
            ],
            'custom_address' => $this->custom_address,
            'description' => $this->description,
            'total_distance' => $this->total_distance,
            
            // belongsTo
            'user' => $this->whenLoaded('user', function () {
                if ($this->user && $this->user->id) {
                    return new UserBasicResource($this->user);
                }
                return null;
            }),
            'company' => $this->whenLoaded('company', function () {
                if ($this->company && $this->company->id) {
                    return new CompanyIndexResource($this->company);
                }
                return null;
            }),
            'car' => $this->whenLoaded('car', function () {
                if ($this->car && $this->car->id) {
                    return new CarBasicResource($this->car);
                }
                return null;
            }),

            // hasMeany
            'delegationTrips' => $this->whenLoaded('delegationTrips', function () {
                return DelegationTripShowResource::collection($this->delegationTrips);
            }),
            'delegationBills' => $this->whenLoaded('delegationBills', function () {
                return DelegationBillShowResource::collection($this->delegationBills);
            }),

        ];
    }
}
