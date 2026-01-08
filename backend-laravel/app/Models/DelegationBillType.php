<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DelegationBillType extends Model
{
    /** @use HasFactory<\Database\Factories\DelegationBillTypeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    // --------------------------------------------------------- //
    // Relacje
    // --------------------------------------------------------- //

    public function delegationBills(): HasMany
    {
        return $this->hasMany(DelegationBill::class);
    }
}
