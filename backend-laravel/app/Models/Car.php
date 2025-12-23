<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Traits\Filterable;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\EmployeeFactory> */
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'registration_number',
        'user_id',
        'active',
    ];

    protected $attributes = [
        'brand' => "",
        'model' => "",
        'registration_number' => "",
        'active' => 1
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

     // --------------------------------------------------------- //
    // Sortowanie i wyszukiwanie
    // --------------------------------------------------------- //

    use Filterable;

    public static array $sortable = [
        'brand',
        'model',
        'registration_number',
        'active',
    ];

    public static array $searchable = [
        'brand',
        'model',
        'registration_number',
    ];

}
