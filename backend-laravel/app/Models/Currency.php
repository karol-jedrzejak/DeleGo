<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\Traits\Filterable;

class Currency extends Model
{
    // klucz główny to 'code', a nie 'id'
    protected $primaryKey = 'code';

    // klucz nie jest autoinkrementowany
    public $incrementing = false;

    // typ klucza głównego
    protected $keyType = 'string';

    /** @use HasFactory<\Database\Factories\DelegationFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'symbol'
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function currencyExchangeRates(): HasMany
    {
        return $this->hasMany(CurrencyExchangeRate::class);
    }

    public function delegationBills(): HasMany
    {
        return $this->hasMany(DelegationBill::class);
    }

    // --------------------------------------------------------- //
    // Sortowanie i wyszukiwanie
    // --------------------------------------------------------- //

    use Filterable;

    public static array $sortable = [
        'code',
        'name',
        'symbol'
    ];

    public static array $searchable = [
        'code',
        'name',
        'symbol'
    ];
}
