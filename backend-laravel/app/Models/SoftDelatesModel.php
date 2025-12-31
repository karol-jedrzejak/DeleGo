<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

abstract class SoftDeletesModel extends Model
{
    use SoftDeletes;
    
    public function resolveRouteBinding($value, $field = null)
    {
        $query = static::query();

        // SAFE GUARD:
        // - Auth facade dostępny
        // - user zalogowany
        // - model używa SoftDeletes
        // - user jest adminem
        if (
            app()->bound('auth') &&
            Auth::check() &&
            in_array(SoftDeletes::class, class_uses_recursive(static::class))
        ) {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            if($user->isAdmin())
            {
                $query->withTrashed();
            }
        }

        return $query
            ->where($field ?? $this->getRouteKeyName(), $value)
            ->firstOrFail();
    }
}
