<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarIndexResource extends JsonResource
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
            'brand' => $this->brand,
            'model' => $this->model,
            'registration_number' => $this->registration_number,
            'user_id' => $this->user_id,
            'deleted_at' => $this->deleted_at,
            
            'user' => $this->whenLoaded('user', function () {
                if ($this->user && $this->user->id) {
                    return new UserBasicResource($this->user);
                }
                return null;
            }),

        ];
    }
}
