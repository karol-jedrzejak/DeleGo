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
            'name' => $this->name,
            'surname' => $this->surname,
            'academic_titles_after' => $this->academic_titles_after,
            'academic_titles_before' => $this->academic_titles_before,
            'email' => $this->email,
            'phone_landline' => $this->phone_landline,
            'phone_mobile' => $this->phone_mobile,
            'position' => $this->position,
            'permissions' => new UserPermissionResource($this),
        ];
    }
}
