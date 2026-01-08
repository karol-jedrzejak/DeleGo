<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\SoftDeletesModel ;
use App\Models\Traits\Filterable;

class Company extends SoftDeletesModel 
{
    use HasFactory;
    use SoftDeletes;  
    
    protected $fillable = [
        'nip',
        'krs',
        'regon',
        'name_short',
        'name_complete',
        'street',
        'house_number',
        'city',
        'postal_code',
        'postal_city',
        'region',
        'country',
        'latitude',
        'longitude',
        'distance',
        'distance_time',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    // --------------------------------------------------------- //
    // Sortowanie i wyszukiwanie
    // --------------------------------------------------------- //

    use Filterable;

    public static array $sortable = [
        'id',
        'nip',
        'krs',
        'regon',
        'name_short',
        'name_complete',
        'street',
        'house_number',
        'city',
        'postal_code',
        'postal_city',
        'region',
        'country',
        'latitude',
        'longitude',
        'distance',
        'distance_time',
        'created_at',
        'updated_at'
    ];

    public static array $searchable = [
        'name_short',
        'name_complete',
    ];
}
