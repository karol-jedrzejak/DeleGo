<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class CarRequest extends FormRequest
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
            'brand' => ['required','string','min:3'],
            'model' => ['required','string','min:3'],
            'registration_number' => ['required','string','min:4','max:12'],
            'user_id' => 'nullable|integer|exists:users,id',
        ];
    }

    public function rules(): array
    {
        $rules = $this->baseRules();

        
        return $rules;
    }

    public function messages()
    {
        return [
            'brand.min' => 'Marka musi miec przynajmniej 3 znaki.',
            'model.min' => 'Model musi miec przynajmniej 3 znaki.',
            'registration_number.min' => 'Nr rejestracyjny musi mieć więcej niż 4 znaki.',
            'registration_number.max' => 'Nr rejestracyjny musi mieć mniej niż 12 znaków.',
        ];
    }
}
