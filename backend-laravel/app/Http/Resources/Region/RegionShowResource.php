<?php

namespace App\Http\Resources\Region;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Region\PerDiemRegionRatesShowResource;

class RegionShowResource extends JsonResource
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
            'region_name' => $this->region_name,
            'country_name' => $this->country_name,
            'currency_code' => $this->currency_code,
            'rates' => PerDiemRegionRatesShowResource::collection(
                $this->whenLoaded('perDiemRegionRates')
            ),
        ];
    }
}
