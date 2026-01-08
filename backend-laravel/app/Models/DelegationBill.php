<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DelegationBill extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationBillFactory> */
    use HasFactory;

    
    protected $fillable = [
        'delegation_id',
        'delegation_bill_type_id',
        'description',
        'amount',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function delegation(): BelongsTo
    {
        return $this->belongsTo(Delegation::class);
    }

    public function delegationBillType(): BelongsTo
    {
        return $this->belongsTo(DelegationBillType::class);
    }
}
