<?php

namespace App\Http\Resources\Company;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeShowResource extends JsonResource
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
            'academic_titles' => [
                'academic_titles_before' => $this->academic_titles_before,
                'academic_titles_after' => $this->academic_titles_after,
            ],
            'contact' => [
                'phone_mobile' => $this->phone_mobile,
                'phone_landline' => $this->phone_landline,
                'email' => $this->email,
            ],
            'identity' => [
                'birth_date' => $this->birth_date,
                'birth_place' => $this->birth_place,
                'pesel' => $this->pesel,
                'passport' => $this->passport,
                'id_card' => $this->id_card,
            ],
            'meta' => [
                'created_at' => $this->created_at,
                'deleted_at' => $this->deleted_at,
                'updated_at' => $this->updated_at,
            ],
        ];
    }
}
