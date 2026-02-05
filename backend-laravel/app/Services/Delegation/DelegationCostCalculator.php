<?php

namespace App\Services\Delegation;

use App\Models\Delegation;
use App\Models\Currency;

class DelegationCostCalculator
{
/*     public function calculate(
        Delegation $delegation,
        string $targetCurrencyCode
    ): array {
        $targetCurrency = Currency::where('code', $targetCurrencyCode)->firstOrFail();

        $total = 0;

        foreach ($delegation->bills as $bill) {
            $billCurrency = $bill->currency;

            // przeliczenie: bill → waluta bazowa → target
            $amountInBase = $bill->amount * $billCurrency->rate;
            $amountInTarget = $amountInBase / $targetCurrency->rate;

            $total += $amountInTarget;
        }

        return [
            'currency' => $targetCurrency->code,
            'total' => round($total, 2),
        ];
    } */
}
