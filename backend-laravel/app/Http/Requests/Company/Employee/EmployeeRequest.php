<?php

namespace App\Http\Requests\Company\Employee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
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
            'name' => ['string','required','min:2','max:30'],
            'surname' => ['string','required','min:2','max:30'],
            'academic_titles_before' => ['string','nullable','min:2','max:20'],
            'academic_titles_after' => ['string','nullable','min:2','max:20'],
            'position' => ['string','nullable'],
            'phone_mobile' => ['nullable','string','regex:/^\+?[0-9 ()]+$/'],
            'phone_landline' => ['nullable','string','regex:/^\+?[0-9 ()]+$/'],
            'email' => ['nullable','email:rfc,dns'],
            'birth_date' => ['nullable','date'],
            'birth_place' => ['string','nullable'],
            'pesel' => ['nullable','string','regex:/^\d{11}$/',
                function ($attribute, $value, $fail) {
                    $weights = [1,3,7,9,1,3,7,9,1,3];
                    $sum = 0;

                    for ($i = 0; $i < 10; $i++) {
                        $sum += $value[$i] * $weights[$i];
                    }

                    $checksum = (10 - ($sum % 10)) % 10;

                    if ($checksum !== (int) $value[10]) {
                        $fail('Nieprawidłowy numer PESEL.');
                    }
                },],
            'passport' => ['nullable','string','regex:/^[A-Z]{2}\d{7}$/'],
            'id_card' => ['nullable','string','regex:/^[A-Z]{3}\d{6}$/',
                function ($attribute, $value, $fail) {
                    $weights = [7,3,1,9,7,3,1,7,3];
                    $sum = 0;

                    for ($i = 0; $i < 3; $i++) {
                        $sum += (ord($value[$i]) - 55) * $weights[$i];
                    }

                    for ($i = 3; $i < 9; $i++) {
                        $sum += (int)$value[$i] * $weights[$i];
                    }

                    if ($sum % 10 !== 0) {
                        $fail('Nieprawidłowy numer dowodu osobistego.');
                    }
                },],
            'active'  => ['boolean','required'],
        ];
    }

    public function rules(): array
    {

        $rules = $this->baseRules();
       
        $name = $this->request->get('name');
        $surname = $this->request->get('surname');

        if ($this->isMethod('post')) {   // create
            $company = $this->route('company');
            $company_id = $company->id;
            $rules['name'][] = Rule::unique('employees', 'name')->where(function ($query) use ($surname, $company_id) {
                return $query->where('surname', '=', $surname)->where('company_id', '=', $company_id);
            });
            $rules['surname'][] = Rule::unique('employees', 'surname')->where(function ($query) use ($name, $company_id) {
                return $query->where('name', '=', $name)->where('company_id', '=', $company_id);
            });
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {  // update
            $employee = $this->route('employee');
            $company_id = $employee->company_id;
            $rules['name'][] = Rule::unique('employees', 'name')->where(function ($query) use ($surname, $company_id) {
                return $query->where('surname', '=', $surname)->where('company_id', '=', $company_id);
            })->ignore($this->request->get('id'));
            $rules['surname'][] = Rule::unique('employees', 'surname')->where(function ($query) use ($name, $company_id) {
                return $query->where('name', '=', $name)->where('company_id', '=', $company_id);
            })->ignore($this->request->get('id'));
        }

        return $rules;
    }

    public function messages()
    {
        return [
            // Name
            'name.unique' => 'Istnieje już pracownik o takim Imieniu i Nazwisku w wybranej firmie.',

            // Surname
            'surname.unique' => 'Istnieje już pracownik o takim Imieniu i Nazwisku w wybranej firmie.',

            // Email
            'email.email' => 'Wprowadź poprawny adres e-mail.',

            // Phone Mobile
            'phone_mobile.regex' => 'Niepoprawny format numeru telefonu (Nr. nie może zawierać spacji, myślników ani nawiasów).',

            // Phone Landline
            'phone_landline.regex' => 'Niepoprawny format numeru telefonu (Nr. nie może zawierać spacji, myślników ani nawiasów).',

            // Pesel
            'pesel.regex' => 'Niepoprawny numer pesel.',

            // Id_card
            'id_card.regex' => 'Niepoprawny numer dowodu osobistego (prawidłowy format to XXX000000 gdzie X to litery a 0 to cyfry).',

            // Passport
            'passport.regex' => 'Niepoprawny numer paszportu.',
        ];
    }
}
