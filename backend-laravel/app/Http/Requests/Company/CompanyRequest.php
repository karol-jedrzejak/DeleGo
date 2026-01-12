<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest
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
            'name_short' => ['required','string','min:3'],
            'name_complete' => ['required','string','min:3'],
            'house_number' => ['string','required'],
            'street' => ['string','required'],
            'city' => ['string','required'],
            'postal_code' => ['required','string','min:3','max:10','regex:/^[A-Za-z0-9][A-Za-z0-9\- ]{1,8}[A-Za-z0-9]$/',],
            'postal_city' => ['string','required'],
            'country' => ['string','required'],
            'region' => ['string','required'],
            'nip' => ['size:10','regex:/^\d{10}$/',
                function ($attribute, $value, $fail) {
                    $weights = [6,5,7,2,3,4,5,6,7];
                    $sum = 0;

                    for ($i = 0; $i < 9; $i++) {
                        $sum += $value[$i] * $weights[$i];
                    }

                    if ($sum % 11 !== (int) $value[9]) {
                        $fail('Nieprawidłowy numer NIP.');
                    }
                },'nullable'],
            'krs' => ['size:10','regex:/^[0-9]+$/','nullable'],
            'regon' => ['regex:/^\d{9}(\d{5})?$/','nullable'],            
            'latitude' => ['between:-90,90','nullable'],
            'longitude' => ['between:-180,180','nullable'],
            'distance' => ['min:1','nullable'],
            'distance_time' => ['min:0.5','nullable'],
        ];
    }

    public function rules(): array
    {
        $rules = $this->baseRules();

        

        if ($this->isMethod('post')) {   // create
            $rules['name_short'][] = 'unique:companies';
            $rules['name_complete'][] = 'unique:companies';
            $rules['nip'][] = 'unique:companies';
            $rules['krs'][] = 'unique:companies';
            $rules['regon'][] = 'unique:companies';
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {  // update
            $companyId = $this->route('company')->id;
            $rules['name_short'][] = Rule::unique('companies')->ignore($companyId);
            $rules['name_complete'][] = Rule::unique('companies')->ignore($companyId);
            $rules['nip'][] = Rule::unique('companies')->ignore($companyId);
            $rules['krs'][] = Rule::unique('companies')->ignore($companyId);
            $rules['regon'][] = Rule::unique('companies')->ignore($companyId);
        }

        return $rules;
    }

    public function messages()
    {
        return [
            // NAME
            'name_short.min' => 'Nazwa musi miec przynajmniej 3 znaki.',
            'name_short.unique' => 'Istnieje już firma z podaną nawą skróconą. Sprawdz czy firma o podanej nazwie nie jest już w bazie firm.',
            
            // NAME COMPLETE
            'name_complete.unique' => 'Istnieje już firma z podaną nawą pełną. Sprawdz czy firma o podanej nazwie nie jest już w bazie firm.',
            'name_complete.min' => 'Nazwa musi miec przynajmniej 3 znaki.',
            
            // NIP
            'nip.size' => 'Nr NIP musi mieć dokładnie 10 cyfr.',
            'nip.regex' => 'Nr NIP musi składać się wyłącznie z cyfr.',
            'nip.unique' => 'Istnieje już firma z podanym numerem NIP.',

            // KRS
            'krs.size' => 'Nr NIP musi mieć dokładnie 10 cyfr.',
            'krs.regex' => 'Nr NIP musi składać się wyłącznie z cyfr.',
            'krs.unique' => 'Istnieje już firma z podanym numerem KRS.',

            // REGON
            'regon.regex' => 'Nr NIP musi składać się wyłącznie z cyfr.',
            'regon.unique' => 'Istnieje już firma z podanym numerem REGON.',

            // Latitude
            'latitude.between' => 'Wartość musi byc w zakresie -90 do +90.',

            // Longitude
            'longitude.between' => 'Wartość musi byc w zakresie -180 do +180.',

            // Distance
            'distance' => 'Odległość nie może być mniejsza niż 1km.',

            // Distance Time
            'distance_time' => 'Czas dojazdu nie może być mniejszy niż 0.5h (jęsli jest mniejszy wpisz 0.5h).',
        ];
    }
}
