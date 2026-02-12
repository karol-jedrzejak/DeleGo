<?php

namespace App\Http\Resources\Delegation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\Company\CompanyIndexResource;
use App\Http\Resources\User\UserBasicResource;
use App\Http\Resources\User\CarBasicResource;

use App\Enums\DelegationStatus;

class DelegationIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $level = $user->getPermissionLevel('delegations','misc');

        $ChangeStatusArray = [];

        foreach (DelegationStatus::from($this->status)->allowedTransitionsForLevel($level) as $transition) {
            $ChangeStatusArray[] = [
                'value' => $transition->value,
                'label' => $transition->label(),
            ];
        }

        return [
            'id' => $this->id,
            'numbers' => [
                'number' => $this->number,
                'year' => $this->year,
            ],
            'dates' => [
                'departure' => $this->departure,
                'return' => $this->return,
            ],
            'status' => $this->status,
            'status_label' => DelegationStatus::from($this->status)->label(),
            'status_color' => DelegationStatus::from($this->status)->color(),
            'user_can_edit' => in_array($this->status, ['draft', 'rejected']),   
            'user_can_change_status' => !empty($ChangeStatusArray),
            'new_status_options' => $ChangeStatusArray,

            'settled' => $this->settled,
            'custom_address' => $this->custom_address,
            'description' => $this->description,
            'total_amount' => $this->total_amount,

            // belongsTo
            'user' => $user?->isAdmin() || $user?->getPermissionLevel('delegations','misc') >= 2
                ? new UserBasicResource($this->user)
                : null,

            // belongsTo
            'company' => $this->whenLoaded('company', function () {
                if ($this->company && $this->company->id) {
                    return new CompanyIndexResource($this->company);
                }
                return null;
            }),

        ];
    }
}
