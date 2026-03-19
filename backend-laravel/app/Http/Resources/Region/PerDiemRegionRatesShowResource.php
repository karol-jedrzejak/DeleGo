<?php

namespace App\Http\Resources\Region;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class PerDiemRegionRatesShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'accommodation_limit' => $this->accommodation_limit,
            'daily_allowance' => $this->daily_allowance,
            'valid_from' => $this->valid_from,
            'valid_to' => $this->valid_to,
        ];
    }
}
