<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delegation extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'company_id',
        'custom_address',
        'description',
        'total_distance',
        'departure',
        'return',
        'settled',
    ];

    protected $attributes = [
        'number' => 1,
        'year' => date('Y'),
        'user_id' => 1,
        'car_id' => null,
        'company_id' => null,
        'custom_address' => null,
        'description' => "",
        'total_distance' => 0,
        'departure' => null,
        'return' => null,
        'settled' => false,
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class)->withDefault();
    }

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class)->withDefault();
    }

    public function delegationBills(): HasMany
    {
        return $this->hasMany(DelegationBill::class);
    }

    public function delegationTrips(): HasMany
    {
        return $this->hasMany(DelegationTrip::class);
    }
}
