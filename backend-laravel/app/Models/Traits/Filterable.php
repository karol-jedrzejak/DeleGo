<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Filters\BaseFilter;
use BaseFilter as GlobalBaseFilter;

trait Filterable
{
    public function scopeFilter(Builder $query, Request $request): Builder
    {
        $filter = new BaseFilter(
            $request,
            $this::$sortable ?? [],
            $this::$searchable ?? []
        );

        return $filter->apply($query);
    }
}