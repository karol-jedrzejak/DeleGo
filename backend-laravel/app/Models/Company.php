<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\Traits\Filterable;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory;

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
        'active',
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
        'active' => 1,
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
        'active',
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

/*  
    protected $appends = [
        'has_employees',
        'address_formatted',
        'address_google_maps',
    ];

    public function getAddressFormattedAttribute(): string
    {
        $postcode = substr($this->postal_code, 0, 2) . '-' . substr($this->postal_code, -3);

        // Brak ulicy
        if (empty($this->street)) {
            return "{$this->city} {$this->house_number}; {$postcode} {$this->postal_city}, {$this->country}";
        }

        // Miasto i poczta to samo
        if ($this->city === $this->postal_city) {
            return "Ul. {$this->street} {$this->house_number}; {$postcode} {$this->postal_city}, {$this->country}";
        }

        // Miasto i poczta różne
        return "Ul. {$this->street} {$this->house_number} {$this->city}; {$postcode} {$this->postal_city}, {$this->country}";
    }

    public function getAddressGoogleMapsAttribute(): string
    {
        $formatted = $this->address_formatted;

        $addressGoogle = config('google.api.maps.route').str_replace(' ', '+', $formatted);

        return $addressGoogle;
    } */

}
