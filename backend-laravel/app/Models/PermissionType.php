<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PermissionType extends Model
{
    /** @use HasFactory<\Database\Factories\PermissionTypeFactory> */
    use HasFactory;

    protected $fillable = [
        'resource',
        'department',
    ];

    protected $attributes = [
        'resource' => '',
        'department' => '',
    ];

    public function permissions(): HasMany
    {
        return $this->hasMany(UserPermission::class);
    }
}
