<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

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
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return [
            'id' => $this->id,
            'numbers' => [
                'number' => $this->number,
                'year' => $this->year,
            ],
            'dates' => [
                'departure' => $this->departure,
                'return' => $this->return,
            ],
            'settled' => $this->settled,
            'custom_address' => $this->custom_address,
            'description' => $this->description,

            // belongsTo
            'user' => $user?->isAdmin()
                ? new UserBasicResource($this->user)
                : null,

            // belongsTo
            'company' => $this->whenLoaded('company', function () {
                if ($this->company && $this->company->id) {
                    return new CompanyIndexResource($this->company);
                }
                return null;
            }),

        ];
    }
}
