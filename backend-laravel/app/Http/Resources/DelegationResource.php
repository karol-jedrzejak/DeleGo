<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DelegationResource extends JsonResource
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
            'number' => $this->number,
            'year' => $this->year,
            'settled' => $this->settled,
            'return' => $this->return,
            'departure' => $this->departure,
            'custom_address' => $this->custom_address,

            // belongsTo
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'surname' => $this->user->surname,
            ]),

            'company' => $this->whenLoaded('company', fn () => [
                'id' => $this->company->id,
                'name_short' => $this->company->name_short,
            ]),

            'car' => $this->whenLoaded('car', fn () => [
                'id' => $this->car->id,
                'registration_number' => $this->car->registration_number,
                'brand' => $this->car->brand,
                'model' => $this->car->model,
            ]),

            // hasMany
            'delegationTrips' => $this->whenLoaded('delegationTrips'),
            'delegationBills' => $this->whenLoaded('delegationBills'),
        ];
    }
}
