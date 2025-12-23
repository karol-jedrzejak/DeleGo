<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\BaseModel;
use App\Models\Traits\Filterable;

class Company extends BaseModel
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

    protected $attributes = [
        'nip' => null,
        'krs' => null,
        'regon' => null,
        'name_short' => '',
        'name_complete' => '',
        'street' => '',
        'house_number' => null,
        'city' => '',
        'postal_code' => '',
        'postal_city' => '',
        'region' => 'Wielkopolska',
        'country' => 'Polska',
        'latitude' => null,
        'longitude' => null,
        'distance' => null,
        'distance_time' => null,
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

    // --------------------------------------------------------- //
    // Appends
    // --------------------------------------------------------- //
    
    protected $appends = [
        'has_employees',
    ];

    public function getHasEmployeesAttribute()
    {
        return $this->employees()->exists();
    }

}
