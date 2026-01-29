<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NbpCurrencyApi
{
    /**
     * Zwraca dane z NBP
     * array<array{
     *   effectiveDate: string,
     *   rates: array<array{
     *     currency: string,
     *     code: string,
     *     mid: float
     *   }>
     * }>
     */
    public function fetchTableALastDays(int $days = 50): array
    {
        $response = Http::get(
            "https://api.nbp.pl/api/exchangerates/tables/a/last/{$days}/?format=json"
        );

        if (!$response->ok()) {
            throw new \RuntimeException('Nie udało się pobrać danych z NBP');
        }

        return $response->json();
    }
}