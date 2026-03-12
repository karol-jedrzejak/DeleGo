<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Region extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationFactory> */
    use HasFactory;

    protected $fillable = [
        'region_name',
        'country_name',
        'currency_code',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function delegation(): BelongsTo
    {
        return $this->belongsTo(Delegation::class);
    }

    public function perDiemRegionRates(): HasMany
    {
        return $this->hasMany(PerDiemRegionRate::class);
    }
}
