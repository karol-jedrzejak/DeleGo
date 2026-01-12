<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserBasicResource extends JsonResource
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
                'name' => $this->name,
                'surname' => $this->surname,
            ],
            'meta' => [
                'deleted_at' => $this->deleted_at,
            ],
        ];
    }
}
