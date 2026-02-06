<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Dictionaries\CurrencyShowResource;
use App\Http\Resources\Delegation\DelegationBillTypeShowResource;


class DelegationBillShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'date' => $this->date,
            'description' => $this->description,
            'currency' => new CurrencyShowResource($this->whenLoaded('currency')),
            'delegation_bill_type' => new DelegationBillTypeShowResource($this->whenLoaded('delegationBillType')),
        ];
    }
}
