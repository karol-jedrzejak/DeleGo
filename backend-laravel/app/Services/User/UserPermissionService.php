<?php

namespace App\Services\User;

use App\Models\PermissionType;
use App\Models\UserPermission;
use Illuminate\Support\Facades\DB;

class UserPermissionService
{
    public function updateUserPermissions(int $userId, array $permissions): void
    {
        DB::transaction(function () use ($userId, $permissions) {

            foreach ($permissions as $department => $resources) {
                foreach ($resources as $resource => $level) {

                    $permissionTypeId = PermissionType::where('department', $department)
                        ->where('resource', $resource)
                        ->value('id');

                    if (!$permissionTypeId) {
                        continue;
                    }

                    UserPermission::updateOrCreate(
                        [
                            'user_id' => $userId,
                            'permission_type_id' => $permissionTypeId,
                        ],
                        [
                            'level' => $level,
                        ]
                    );
                }
            }
        });
    }
}
