<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Traits\Filterable;

class CurrencyExchangeRate extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationFactory> */
    use HasFactory;

    protected $fillable = [
        'currency_code',
        'rate_date',
        'rate',
        'source',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    // --------------------------------------------------------- //
    // Sortowanie i wyszukiwanie
    // --------------------------------------------------------- //

    use Filterable;

    public static array $sortable = [
        'currency_code',
        'rate_date',
        'rate',
        'source',
    ];

    public static array $searchable = [
        'currency_code',
        'rate_date',
    ];
}
