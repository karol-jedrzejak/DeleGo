<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\SoftDeletesModel ;
use App\Models\Traits\Filterable;

class Employee extends SoftDeletesModel 
{
    use HasFactory;
    use SoftDeletes;  
    
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
    ];

    public static array $searchable = [
        'name',
        'surname',
        'position',
    ];

}
