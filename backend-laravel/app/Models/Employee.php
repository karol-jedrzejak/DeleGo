<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Traits\Filterable;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\EmployeeFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'surname',
        'academic_titles_before',
        'academic_titles_after',
        'position',
        'phone_mobile',
        'phone_landline',
        'email',
        'birth_date',
        'birth_place',
        'pesel',
        'passport',
        'id_card',
        'active',
    ];

    protected $attributes = [
        'company_id' => null,
        'name' => '',
        'surname' => '',
        'position' => null,
        'academic_titles_before'=> null,
        'academic_titles_after'=> null,
        'phone_mobile' => null,
        'phone_landline' => null,
        'email' => null,
        'birth_date' => null,
        'birth_place' => null,
        'pesel' => null,
        'passport' => null,
        'id_card' => null,
        'active' => 1,
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

     // --------------------------------------------------------- //
    // Sortowanie i wyszukiwanie
    // --------------------------------------------------------- //

    use Filterable;

    public static array $sortable = [
        'company_id',
        'name',
        'surname',
        'academic_titles_before',
        'academic_titles_after',
        'position',
        'phone_mobile',
        'phone_landline',
        'email',
        'birth_date',
        'birth_place',
        'pesel',
        'passport',
        'id_card',
        'active',
    ];

    public static array $searchable = [
        'name',
        'surname',
        'position',
    ];

}
