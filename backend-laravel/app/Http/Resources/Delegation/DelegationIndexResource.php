<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Company\CompanyIndexResource;
use App\Http\Resources\User\UserBasicResource;
use App\Http\Resources\User\CarBasicResource;

class DelegationIndexResource extends JsonResource
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
            'numbers' => [
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

            // belongsTo
            'company' => $this->whenLoaded('company', function () {
                if ($this->company && $this->company->id) {
                    return new CompanyIndexResource($this->company);
                }
                return null;
            }),

            // belongsTo
            'car' => $this->whenLoaded('car', function () {
                if ($this->car && $this->car->id) {
                    return new CarBasicResource($this->car);
                }
                return null;
            }),
        ];
    }
}
