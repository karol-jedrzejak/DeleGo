<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DelegationTripType extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationTripFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'requires_car',
        'requires_description'
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function delegationTrips(): HasMany
    {
        return $this->hasMany(DelegationTrip::class);
    }
}
