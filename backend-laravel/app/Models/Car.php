<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\SoftDeletesModel ;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\Filterable;

class Car extends SoftDeletesModel 
{
    use HasFactory;
    use SoftDeletes;  

    protected $fillable = [
        'brand',
        'model',
        'registration_number',
        'user_id',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function delegationTrips(): HasMany
    {
        return $this->hasMany(DelegationTrip::class);
    }

    // --------------------------------------------------------- //
    // Sortowanie i wyszukiwanie
    // --------------------------------------------------------- //

    use Filterable;

    public static array $sortable = [
        'user.name',
        'user.surname',
        'brand',
        'model',
        'registration_number',
    ];

    public static array $searchable = [
        'brand',
        'model',
        'registration_number',
    ];

}
