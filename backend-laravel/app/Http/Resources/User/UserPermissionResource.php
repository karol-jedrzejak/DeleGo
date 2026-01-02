<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\PermissionType;

class UserPermissionResource extends JsonResource
{
    protected static $permissionTemplate = null;

    protected static function getPermissionTemplate()
    {
        if (!self::$permissionTemplate) {
            // wszystkie możliwe permission types
            $permission_types = PermissionType::orderBy('department')->orderBy('resource')->get();

            $template = [];
            foreach ($permission_types as $permission) {
                $dep = $permission->department;
                $res = $permission->resource;
                
                // jeśli departament jeszcze nie istnieje → tworzymy    
                if (!isset($template[$dep])) {
                    $template[$dep] = [];
                }

                // dodajemy resource ustawiając wartość 0
                $template[$dep][$res] = 0;
            }

            self::$permissionTemplate = $template;
        }

        return self::$permissionTemplate;
    }

    public function toArray($request)
    {
        $all_permissions = self::getPermissionTemplate();

        foreach ($this->permissions as $permission) {
            $all_permissions[$permission->type->department][$permission->type->resource] = $permission->level;
        }

        return $all_permissions;
    }
}
