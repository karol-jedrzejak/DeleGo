<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DelegationTrip extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationTripFactory> */
    use HasFactory;

    protected $fillable = [
        'delegation_id',
        'car_id',
        'delegation_trip_type_id',
        'custom_transport',
        'starting_point',
        'destination',
        'description',
        'distance',
        'departure',
        'arrival',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class)->withDefault();
    }

    public function delegation(): BelongsTo
    {
        return $this->belongsTo(Delegation::class);
    }

    public function delegationTripType(): BelongsTo
    {
        return $this->belongsTo(DelegationTripType::class);
    }
}
