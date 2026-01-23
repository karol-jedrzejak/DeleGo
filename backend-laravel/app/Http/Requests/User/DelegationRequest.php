<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class DelegationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    protected function baseRules(): array
    {
        return [
                        // === DELEGATION ===
            'settled' => ['required', 'boolean'],
            'description' => ['required', 'string'],
            'custom_address' => ['nullable', 'string'],

            'user_id' => ['required', 'exists:users,id'],
            'company_id' => ['nullable', 'exists:companies,id'],

            // === TRIPS ===
            'delegation_trips' => ['required', 'array', 'min:1'],
            'delegation_trips.*.delegation_trip_type_id' => ['required', 'exists:delegation_trip_types,id'],
            'delegation_trips.*.car_id' => ['nullable', 'exists:cars,id'],
            'delegation_trips.*.distance' => ['nullable', 'integer', 'min:0'],
            'delegation_trips.*.custom_transport' => ['nullable', 'string'],
            'delegation_trips.*.starting_point' => ['required', 'string'],
            'delegation_trips.*.destination' => ['required', 'string'],
            'delegation_trips.*.description' => ['required', 'string'],
            'delegation_trips.*.departure' => ['required', 'date'],
            'delegation_trips.*.arrival' => ['required', 'date', 'after:delegation_trips.*.departure'],

            // === BILLS ===
            'delegation_bills' => ['required', 'array'],
            'delegation_bills.*.delegation_bill_type_id' => ['required', 'exists:delegation_bill_types,id'],
            'delegation_bills.*.description' => ['required', 'string'],
            'delegation_bills.*.amount' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function rules(): array
    {
        $rules = $this->baseRules();
     
        if ($this->isMethod('post')) {   // create
           // Tylko dla create
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {  // update
            // tylko dla edit
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'description.required' => 'Uzupełnij opis.',
            'delegation_trips.*.departure.required' => 'Uzupełnij datę wyjazdu.',
            'delegation_trips.*.arrival.required' => 'Uzupełnij datę powrotu.',
            'delegation_trips.*.arrival.after' => 'Data powrotu musi być po dacie wyjazdu.',
        ];
    }
}
