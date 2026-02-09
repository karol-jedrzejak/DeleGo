<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\User\UserBasicResource;

use App\Enums\DelegationStatus;

class DelegationStatusHistoryShowResource extends JsonResource
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
            'from_status' => $this->from_status,
            'from_status_label' => $this->from_status ? DelegationStatus::from($this->from_status)->label() : "-",
            'to_status' => $this->to_status,
            'to_status_label' => DelegationStatus::from($this->to_status)->label(),
            'to_status_color' => DelegationStatus::from($this->to_status)->color(),
            'comment' => $this->comment,
            'created_at' => $this->created_at,

            // belongsTo
            'user' => $this->whenLoaded('changer', function () {
                return new UserBasicResource($this->changer);
            }),
        ];
    }
}
