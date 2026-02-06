<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DelegationStatusHistory extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationStatusHistoryFactory> */
    use HasFactory;

    protected $fillable = [
        'delegation_id',
        'changed_by',
        'from_status',
        'to_status',
        'comment',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function delegation(): BelongsTo
    {
        return $this->belongsTo(Delegation::class);
    }
}
