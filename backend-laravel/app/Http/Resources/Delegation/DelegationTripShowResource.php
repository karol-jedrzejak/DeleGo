<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


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
            'departure' => $this->departure,
            'description' => $this->description,
            'destination' => $this->destination,
            'distance' => $this->distance,
            'id' => $this->id,
            'starting_point' => $this->starting_point,
        ];
    }
}
