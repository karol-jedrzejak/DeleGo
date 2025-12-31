<?php

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyIndexResource extends JsonResource
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
            'name_short' => $this->name_short,
            'name_complete' => $this->name_complete,
            'country' => $this->country,
            'region' => $this->region,
            'street' => $this->street,
            'house_number' => $this->house_number,
            'city' => $this->city,
            'postal_code' => $this->postal_code,
            'postal_city' => $this->postal_city,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
