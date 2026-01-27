<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        $response = Http::get('https://api.nbp.pl/api/exchangerates/tabless/a/?format=json');

        if (!$response->ok()) {
            $this->error('Błąd pobierania danych z NBP!');
            return 1;
        }

        $data = $response->json(); // tablica pierwsza -> tabela A

        $length = count($data);
        $this->info("Dane z ostatnich $length dni:");
        $first = true;





        $date = $data['effectiveDate'];
        $rates = $data['rates'];

        $this->info("Dane z dnia: $date");

        // 2. Zapis kursów i walut do bazy
        foreach ($rates as $rate) {
            // Zapis waluty do tabeli currencies (jeżeli nie istnieje)
            $currency = Currency::updateOrCreate(
                ['code' => $rate['code']],
                [
                    'name' => $rate['currency'],
                    'symbol' => null // NBP nie podaje symbolu
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

        $this->info('Dane zapisane pomyślnie.');
        return 0;

    }
}
