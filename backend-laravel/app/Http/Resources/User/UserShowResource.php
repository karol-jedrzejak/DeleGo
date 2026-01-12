<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\User\UserPermissionResource;

class UserShowResource extends JsonResource
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
            'academic_titles' => [
                'after' => $this->academic_titles_after,
                'before' => $this->academic_titles_before,
            ],
            'contact' => [
                'phone_mobile' => $this->phone_mobile,
                'phone_landline' => $this->phone_landline,
                'email' => $this->email,
            ],
            'position' => $this->position,
            'permissions' => new UserPermissionResource($this),
            'meta' => [
                'created_at' => $this->created_at,
                'deleted_at' => $this->deleted_at,
                'updated_at' => $this->updated_at,
            ],
        ];
    }
}
