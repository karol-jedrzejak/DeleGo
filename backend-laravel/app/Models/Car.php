<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\Filterable;

class Car extends BaseModel
{
    use HasFactory;
    use SoftDeletes;  

    protected $fillable = [
        'brand',
        'model',
        'registration_number',
        'user_id',
    ];

    protected $attributes = [
        'brand' => "",
        'model' => "",
        'registration_number' => "",
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
    ];

    public static array $searchable = [
        'brand',
        'model',
        'registration_number',
    ];

}
