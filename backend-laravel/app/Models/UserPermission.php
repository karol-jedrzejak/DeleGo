<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPermission extends Model
{
    /** @use HasFactory<\Database\Factories\UserPermissionFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'permission_type_id',
        'level',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(PermissionType::class, 'permission_type_id');
    }
}
