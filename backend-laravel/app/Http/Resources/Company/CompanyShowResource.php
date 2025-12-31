<?php

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyShowResource extends JsonResource
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
            'nip' => $this->nip,
            'krs' => $this->krs,
            'regon' => $this->regon,
            'name_short' => $this->name_short,
            'name_complete' => $this->name_complete,
            'street' => $this->street,
            'house_number' => $this->house_number,
            'city' => $this->city,
            'postal_code' => $this->postal_code,
            'postal_city' => $this->postal_city,
            'region' => $this->region,
            'country' => $this->country,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'distance' => $this->distance,
            'distance_time' => $this->distance_time,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
