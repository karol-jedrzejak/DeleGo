<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\User\CarBasicResource;

class DelegationTripShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'arrival' => $this->arrival,
            'custom_transport' => $this->custom_transport,
            'departure' => $this->departure,
            'description' => $this->description,
            'destination' => $this->destination,
            'distance' => $this->distance,
            'id' => $this->id,
            'starting_point' => $this->starting_point,
            
            'delegation_trip_type' => new DelegationTripTypeShowResource($this->whenLoaded('delegationTripType')),

            'car' => $this->whenLoaded('car', function () {
                if ($this->car && $this->car->id) {
                    return new CarBasicResource($this->car);
                }
                return null;
            }),
        ];
    }
}
