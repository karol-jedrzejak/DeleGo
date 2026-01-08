<?php

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyBasicResource extends JsonResource
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
            'names' => [
                'name_short' => $this->name_short,
                'name_complete' => $this->name_complete,
            ],
            'address' => [
                'street' => $this->street,
                'house_number' => $this->house_number,
                'city' => $this->city,
                'postal_code' => $this->postal_code,
                'postal_city' => $this->postal_city,
                'region' => $this->region,
                'country' => $this->country,
            ],
            'meta' => [
                'deleted_at' => $this->deleted_at,
            ],
        ];
    }
}
