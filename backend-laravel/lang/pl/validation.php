<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Pole :attribute musi zostać zaakceptowane.',
    'accepted_if' => 'Pole :attribute musi zostać zaakceptowane, gdy :other jest równe :value.',
    'active_url' => 'Pole :attribute musi być prawidłowym adresem URL.',
    'after' => 'Pole :attribute musi zawierać datę po :date.',
    'after_or_equal' => 'Pole :attribute musi zawierać datę po :date lub równą :date.',
    'alpha' => 'Pole :attribute musi zawierać tylko litery.',
    'alpha_dash' => 'Pole :attribute musi zawierać tylko litery, cyfry, myślniki i podkreślenia.',
    'alpha_num' => 'Pole :attribute musi zawierać tylko litery i cyfry.',
    'any_of' => 'Pole :attribute jest nieprawidłowe.',
    'array' => 'Pole :attribute musi być tablicą.',
    'ascii' => 'Pole :attribute może zawierać wyłącznie jednobajtowe znaki alfanumeryczne i symbole.',
    'before' => 'Pole :attribute musi zawierać datę wcześniejszą niż :date.',
    'before_or_equal' => 'Pole :attribute musi zawierać datę wcześniejszą lub równą :date.',
    'between' => [
        'array' => 'Pole :attribute musi zawierać od :min do :max elementów.',
        'file' => 'Pole :attribute musi zawierać od :min do :max kilobajtów.',
        'numeric' => 'Pole :attribute musi zawierać od :min do :max.',
        'string' => 'Pole :attribute musi zawierać się między :min a :max znaków.',
    ],
    'boolean' => 'Pole :attribute musi mieć wartość prawda albo fałsz.',
    'can' => 'Pole :attribute zawiera nieautoryzowaną wartość.',
    'confirmed' => 'Potwierdzenie pola :attribute nie jest zgodne.',
    'contains' => 'W polu :attribute brakuje wymaganej wartości.',
    'current_password' => 'Hasło jest nieprawidłowe.',
    'date' => 'Pole :attribute musi zawierać prawidłową datę.',
    'date_equals' => 'Pole :attribute musi zawierać datę równą :date.',
    'date_format' => 'Pole :attribute musi być zgodne z formatem :format.',
    'decimal' => 'Pole :attribute musi zawierać :decimal miejsc dziesiętnych.',
    'declined' => 'Pole :attribute musi zostać odrzucone.',
    'declined_if' => 'Pole :attribute musi zostać odrzucone, gdy :other ma wartość :value.',
    'different' => 'Pole :attribute i :other muszą być różne.',
    'digits' => 'Pole :attribute musi mieć wartość :digits cyfr.',
    'digits_between' => 'Pole :attribute musi zawierać cyfry od :min do :max cyfr.',
    'dimensions' => 'Pole :attribute ma nieprawidłowe wymiary obrazu.',
    'distinct' => 'Pole :attribute ma zduplikowaną wartość.',
    'doesnt_contain' => 'Pole :attribute nie może zawierać żadnego z poniższych: :values.',
    'doesnt_end_with' => 'Pole :attribute nie może kończyć się jednym z następujących elementów: :values.',
    'doesnt_start_with' => 'Pole :attribute nie może zaczynać się jednym z następujących elementów: :values.',
    'email' => 'Pole :attribute musi być prawidłowym adresem e-mail.',
    'ends_with' => 'Pole :attribute musi kończyć się jednym z następujących elementów: :values.',
    'enum' => 'Wybrany :attribute jest nieprawidłowy.',
    'exists' => 'Wybrany :attribute jest nieprawidłowy.',
    'extensions' => 'Pole :attribute musi mieć jedno z następujących rozszerzeń: :values.',
    'file' => 'Pole :attribute musi być plikiem.',
    'filled' => 'Pole :attribute musi mieć wartość.',
    'gt' => [
        'array' => 'Pole :attribute musi mieć więcej niż :value elementów.',
        'file' => 'Pole :attribute musi mieć więcej niż :value kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć więcej niż :value.',
        'string' => 'Pole :attribute musi mieć więcej niż :value znaków.',
    ],
    'gte' => [
        'array' => 'Pole :attribute musi mieć więcej niż :value elementów.',
        'file' => 'Pole :attribute musi mieć więcej niż :value kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć więcej niż :value elementów.',
        'string' => 'Pole :attribute musi mieć więcej niż :value znaków. lub równe :value znaków.',
    ],
    'hex_color' => 'Pole :attribute musi zawierać prawidłowy kolor szesnastkowy.',
    'image' => 'Pole :attribute musi być obrazkiem.',
    'in' => 'Wybrany :attribute jest nieprawidłowy.',
    'in_array' => 'Pole :attribute musi znajdować się w :other.',
    'in_array_keys' => 'Pole :attribute musi zawierać co najmniej jeden z następujących kluczy: :values.',
    'integer' => 'Pole :attribute musi być liczbą całkowitą.',
    'ip' => 'Pole :attribute musi zawierać prawidłowy adres IP.',
    'ipv4' => 'Pole :attribute musi zawierać prawidłowy adres IPv4.',
    'ipv6' => 'Pole :attribute musi zawierać prawidłowy adres IPv6.',
    'json' => 'Pole :attribute musi zawierać prawidłowy ciąg JSON.',
    'list' => 'Pole :attribute musi być listą.',
    'lowercase' => 'Pole :attribute musi zawierać małe litery.',
    'lt' => [
        'array' => 'Pole :attribute musi mieć mniej niż :value elementów.',
        'file' => 'Pole :attribute musi mieć mniej niż :value kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć mniej niż :value.',
        'string' => 'Pole :attribute musi mieć mniej niż :value znaków.',
    ],
    'lte' => [
        'array' => 'Pole :attribute nie może mieć więcej niż :value elementów.',
        'file' => 'Pole :attribute musi mieć mniej niż :value kilobajtów.',
        'numeric' => 'Pole :attribute musi być mniejsze lub równe :value.',
        'string' => 'Pole :attribute musi mieć mniej niż ≥ :value znaków.',
    ],
    'mac_address' => 'Pole :attribute musi być prawidłowym adresem MAC.',
    'max' => [
        'array' => 'Pole :attribute nie może zawierać więcej niż :max elementów.',
        'file' => 'Pole :attribute nie może zawierać więcej niż :max kilobajtów.',
        'numeric' => 'Pole :attribute nie może zawierać więcej niż :max.',
        'string' => 'Pole :attribute nie może zawierać więcej niż :max znaków.',
    ],
        'max_digits' => 'Pole :attribute nie może zawierać więcej niż :max cyfr.',
        'mimes' => 'Pole :attribute musi być plikiem typu :values.',
        'mimetypes' => 'Pole :attribute musi być plikiem typu: :values.',
        'min' => [
        'array' => 'Pole :attribute musi zawierać co najmniej :min elementów.',
        'file' => 'Pole :attribute musi mieć co najmniej :min kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć co najmniej :min.',
        'string' => 'Pole :attribute musi mieć co najmniej :min znaków.',
    ],
    'min_digits' => 'Pole :attribute musi mieć co najmniej :min cyfr.',
    'missing' => 'Pole :attribute musi być nieobecne.',
    'missing_if' => 'Pole :attribute musi być nieobecne, gdy :other jest :value.',
    'missing_unless' => 'Pole :attribute musi być nieobecne, chyba że :other jest :value.',
    'missing_with' => 'Pole :attribute musi być nieobecne, gdy obecne jest :values.',
    'missing_with_all' => 'Pole :attribute musi być nieobecne, gdy obecne jest :values.',
    'multiple_of' => 'Pole :attribute musi być wielokrotnością :value.',
    'not_in' => 'Wybrany :attribute jest nieprawidłowy.',
    'not_regex' => 'Format pola :attribute jest nieprawidłowy.',
    'numeric' => 'Pole :attribute musi być liczbą.',
    'password' => [
        'letters' => 'Pole :attribute musi zawierać co najmniej jedną literę.',
        'mixed' => 'Pole :attribute musi zawierać co najmniej jedną wielką i jedną małą literę.',
        'numbers' => 'Pole :attribute musi zawierać co najmniej jedną cyfrę.',
        'symbols' => 'Pole :attribute musi zawierać co najmniej jeden symbol.',
        'uncompromised' => 'Podany :attribute pojawił się w wycieku danych. Wybierz inny :attribute.',
    ],
    'present' => 'Pole :attribute musi być obecne.',
    'present_if' => 'Pole :attribute musi być obecne, gdy :other jest :value.',
    'present_unless' => 'Pole :attribute musi być obecne, chyba że :other jest :value.',
    'present_with' => 'Pole :attribute musi być obecne, gdy :values ​​jest obecne.',
    'present_with_all' => 'Pole :attribute musi być obecne, gdy :values ​​jest obecne.',
    'prohibited' => 'Pole :attribute jest zabronione.',
    'prohibited_if' => 'Pole :attribute jest zabronione, gdy :other jest :value.',
    'prohibited_if_accepted' => 'Pole :attribute jest zabronione, gdy :other jest akceptowane.',
    'prohibited_if_declined' => 'Pole :attribute jest zabronione, gdy :other jest odrzucone.',
    'prohibited_unless' => 'Pole :attribute jest zabronione, chyba że :other znajduje się w :values.',
    'prohibits' => 'Pole :attribute zabrania obecności :other.',
    'regex' => 'Format pola :attribute jest nieprawidłowy.',
    'required' => 'Pole :attribute jest wymagane.',
    'required_array_keys' => 'Pole :attribute musi zawierać wpisy dla: :values.',
    'required_if' => 'Pole :attribute jest wymagane, gdy :other jest :value.',
    'required_if_accepted' => 'Pole :attribute jest wymagane, gdy :other jest akceptowane.',
    'required_if_declined' => 'Pole :attribute jest wymagane, jeśli :other jest odrzucane.',
    'required_unless' => 'Pole :attribute jest wymagane, chyba że :other znajduje się w :values.',
    'required_with' => 'Pole :attribute jest wymagane, jeśli :values ​​jest obecne.',
    'required_with_all' => 'Pole :attribute jest wymagane, jeśli :values ​​jest obecne.',
    'required_without' => 'Pole :attribute jest wymagane, jeśli :values ​​nie jest obecne.',
    'required_without_all' => 'Pole :attribute jest wymagane, jeśli żadne z :values ​​nie jest obecne.',
    'same' => 'Pole :attribute musi pasować do :other.',
    'size' => [
        'array' => 'Pole :attribute musi zawierać elementy :size.',
        'file' => 'Pole :attribute musi mieć :size kilobajtów.',
        'numeric' => 'Pole :attribute musi mieć :size.',
        'string' => 'Pole :attribute musi mieć :size znaków.',
    ],
    'starts_with' => 'Pole :attribute musi zaczynać się od jednego z następujących: :values.',
    'string' => 'Pole :attribute musi być ciągiem znaków.',
    'timezone' => 'Pole :attribute musi zawierać prawidłową strefę czasową.',
    'unique' => 'Pole :attribute zostało już zajęte.',
    'uploaded' => 'Pole :attribute nie powiodło się Prześlij.',
    'uppercase' => 'Pole :attribute musi być pisane wielkimi literami.',
    'url' => 'Pole :attribute musi byc poprawnym adresem URL.',
    'ulid' => 'Pole :attribute musi byc poprawnym adresem ULID.',
    'uuid' => 'Pole :attribute musi byc poprawnym adresem UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
