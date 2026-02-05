<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Services\Currency\NbpCurrencyApi;
use App\Models\Currency;
use App\Models\CurrencyExchangeRate;

class CurrencySeeder extends Seeder
{
    public array $currency_symbols = [
            "BGN" => "лв",
            "THB" => '฿',
            "USD" => '$',
            "AUD" => '$',
            "HKD" => '$',
            "CAD" => '$',
            "NZD" => '$',
            "SGD" => '$',
            "EUR" => '€',
            "HUF" => 'Ft',
            'CHF' => 'CHF',
            'GBP' => '£',
            "UAH" => "₴",
            'JPY' => '¥',
            "CZK" => "Kč",
            "DKK" => "kr.",
            "ISK" => "Íkr",
            "NOK" => "nkr",
            "SEK" => "kr",
            "RON" => "L",
            "TRY" => "₺",
            "ILS" => "₪",
            "CLP" => "$",
            "PHP" => "₱",
            "MXN" => "$",
            "ZAR" => "R",
            "BRL" => "R$",
            "MYR" => "RM",
            "IDR" => "Rp",
            "INR" => "₹",
            "KRW" => "₩",
            'CNY' => '¥',
        ];

    public function run(): void
    {
        $api = app(NbpCurrencyApi::class);
        $data = $api->fetchTableALastDays(50);

        Currency::updateOrCreate(
            ['code' => 'PLN'],
            ['name' => 'Złoty', 'symbol' => 'zł']
        );

        foreach ($data as $day) {
            $date  = $day['effectiveDate'];
            $rates = $day['rates'];

            foreach ($rates as $rate) {
                if ($rate['code'] === 'XDR') {
                    continue;
                }

                Currency::updateOrCreate(
                    ['code' => $rate['code']],
                    [
                        'name'   => Str::title($rate['currency']),
                        'symbol' => $this->currency_symbols[$rate['code']] ?? '',
                    ]
                );

                CurrencyExchangeRate::updateOrCreate(
                    [
                        'currency_code' => $rate['code'],
                        'rate_date'     => $date,
                        'source'        => 'NBP',
                    ],
                    [
                        'rate' => $rate['mid'],
                    ]
                );
            }
        }
    }
}
