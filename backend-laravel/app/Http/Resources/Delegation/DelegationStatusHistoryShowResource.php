<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\User\UserBasicResource;

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
            'to_status' => $this->to_status,
            'comment' => $this->comment,

            // belongsTo
            'user' => $this->whenLoaded('user', function () {
                return new UserBasicResource($this->user);
            }),
        ];
    }
}
