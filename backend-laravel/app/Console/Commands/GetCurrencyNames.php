<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Http;
use App\Models\Currency;
use App\Models\CurrencyExchangeRate;


class GetCurrencyNames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-currency-names';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pobranie nazw walut (i kursów z ostatnich 50 dni) z NBP API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Pobieranie danych z NBP...');

        // 1. Pobranie danych JSON z API
        $response = Http::get('https://api.nbp.pl/api/exchangerates/tables/a/last/50/?format=json');

        if (!$response->ok()) {
            $this->error('Błąd pobierania danych z NBP!');
            return 1;
        }

        $data = $response->json(); // tablica pierwsza -> tabela A

        $length = count($data);
        $this->info("Dane z ostatnich $length dni:");

        $currency_symbols = [
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

        Currency::updateOrCreate(
            ['code' => "PLN"],
            [
                'name' => "Złoty",
                'symbol' => 'zł'
            ]
        );

        $bar = $this->output->createProgressBar($length);
        $bar->setBarCharacter("\033[32m█\033[0m");   // zielony
        $bar->setEmptyBarCharacter('░');
        $bar->setProgressCharacter('');
        $bar->start();

        foreach($data as $one_day_data)
        {
            $date = $one_day_data['effectiveDate'];
            $rates = $one_day_data['rates'];

            $bar->advance();

            // 2. Zapis kursów i walut do bazy
            foreach ($rates as $rate) {
                
                if($rate['code'] != "XDR")
                {
                  // Zapis waluty do tabeli currencies (jeżeli nie istnieje)
                  $currency = Currency::updateOrCreate(
                      ['code' => $rate['code']],
                      [
                          'name' => Str::title($rate['currency']),
                          'symbol' => $currency_symbols[$rate['code']] ?? ''
                      ]
                  );
                
                  // Zapis kursu
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

        $bar->finish();
        $this->newLine();
        $this->info('Dane zapisane pomyślnie.');

        return 0;

    }
}
