<?php

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeIndexResource extends JsonResource
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
            'company_id' => $this->company_id,
            'names' => [
                'name' => $this->name,
                'surname' => $this->surname,
            ],
            'position' => $this->position,
            'contact' => [
                'phone_mobile' => $this->phone_mobile,
                'phone_landline' => $this->phone_landline,
                'email' => $this->email,
            ],
            'meta' => [
                'deleted_at' => $this->deleted_at,
            ],
        ];
    }
}
