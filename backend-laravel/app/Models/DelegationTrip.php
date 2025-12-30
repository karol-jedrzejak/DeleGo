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
        'starting_point',
        'destination',
        'description',
        'distance',
        'departure',
        'arrival',
    ];

    protected $attributes = [
        'delegation_id' => null,
        'starting_point' => "",
        'destination' => "",
        'description' => "",
        'distance' => 0,
        'departure' => null,
        'arrival' => null,
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function delegation(): BelongsTo
    {
        return $this->belongsTo(Delegation::class);
    }
}
