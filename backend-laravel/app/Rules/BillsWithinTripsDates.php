<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class BillsWithinTripsDates implements ValidationRule
{
    protected array $trips;

    public function __construct(array $trips)
    {
        $this->trips = $trips;
    }

    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): void  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($this->trips)) {
            return; // brak tripów → brak ograniczeń
        }

        // zamieniamy datetime tripów na Y-m-d
        $departureDates = collect($this->trips)->pluck('departure')->map(fn($d) => date('Y-m-d', strtotime($d)));
        $arrivalDates   = collect($this->trips)->pluck('arrival')->map(fn($d) => date('Y-m-d', strtotime($d)));

        $minDate = $departureDates->min();
        $maxDate = $arrivalDates->max();

        // walidacja bill.date
        if ($value < $minDate || $value > $maxDate) {
            $fail("Data rachunku musi mieścić się w okresie trwania delegacji ({$minDate} do {$maxDate}).");
        }
    }
}
