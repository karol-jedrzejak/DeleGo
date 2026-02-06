<?php

namespace App\Http\Requests\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Rules\BillsWithinTripsDates;


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
        $trips = $this->delegation_trips ?? [];
        
        return [
            // === DELEGATION ===
            'settled' => ['required', 'boolean'],
            'description' => ['required', 'string'],

            'company_id' => [
                'nullable',
                'exists:companies,id',
                'required_without:custom_address',
                'prohibited_if:custom_address,!null',
            ],
            'custom_address' => [
                'nullable',
                'string',
                'required_without:company_id',
                'prohibited_if:company_id,!null',
            ],

            // === TRIPS ===
            'delegation_trips' => ['required', 'array', 'min:2'],
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
            'delegation_bills' => ['array','nullable'],
            'delegation_bills.*.currency_code' => ['required'],
            'delegation_bills.*.delegation_bill_type_id' => ['required', 'exists:delegation_bill_types,id'],
            'delegation_bills.*.description' => ['required', 'string'],
            'delegation_bills.*.date' => ['required', 'date', new BillsWithinTripsDates($trips)],
            'delegation_bills.*.amount' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function rules(): array
    {
        $rules = $this->baseRules();
     
        $user = $this->user(); // to samo co Auth::user()

        if ($user && $user->isAdmin()) {
            $rules['user_id'] = ['required', 'exists:users,id'];
        } else {
            $rules['user_id'] = ['nullable'];
        }

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
            'user_id' => 'Wybierz użytkownika',
            'description.required' => 'Uzupełnij opis.',

            'company_id.required_without' => 'Musisz wybrać firmę lub podać adres niestandardowy.',
            'company_id.prohibited_if' => 'Nie możesz jednocześnie wybrać firmy i podać adresu niestandardowego.',
            'company_id.exists' => 'Wybrana firma nie istnieje.',
            'custom_address.required_without' => 'Musisz podać adres niestandardowy lub wybrać firmę.',
            'custom_address.prohibited_if' => 'Nie możesz jednocześnie podać adresu niestandardowego i wybrać firmy.',
            'custom_address.string' => 'Adres niestandardowy musi być tekstem.',

            'delegation_trips.required' => 'Uzupełnij przejazdy.',
            'delegation_trips.min' => 'Delegacja musi mieć przynajmniej 2 przejazdy.',
            'delegation_trips.*.departure.required' => 'Uzupełnij datę wyjazdu.',
            'delegation_trips.*.arrival.required' => 'Uzupełnij datę powrotu.',
            'delegation_trips.*.arrival.after' => 'Data powrotu musi być po dacie wyjazdu.',
        ];
    }
}
