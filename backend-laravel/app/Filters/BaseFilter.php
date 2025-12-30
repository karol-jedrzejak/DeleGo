<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class BaseFilter
{
    protected Request $request;
    protected array $sortable = [];
    protected array $searchable = [];
    protected array $joinedTables = [];

    public function __construct(Request $request, array $sortable, array $searchable)
    {
        $this->request = $request;
        $this->sortable = $sortable;
        $this->searchable = $searchable;
    }

    public function apply(Builder $query): Builder
    {
        $this->applySearch($query);
        $this->applySorting($query);

        return $query;
    }

    /* -------------------------------------------------
     | SEARCH
     |--------------------------------------------------*/

    protected function applySearch(Builder $query): void
    {
        $search = $this->request->query('search');
        $searchBy = $this->request->query('searchBy');

        // searchBy: konkretne pola
        if (is_array($searchBy) && count($searchBy)) {
            $query->where(function ($q) use ($searchBy) {
                foreach ($searchBy as $column => $value) {
                    $this->applyWhere($q, $column, $value);
                }
            });
            return;
        }

        // search: globalny
        if ($search && count($this->searchable)) {
            $query->where(function ($q) use ($search) {
                foreach ($this->searchable as $column) {
                    $this->applyOrWhere($q, $column, $search);
                }
            });
        }
    }

    protected function applyWhere(Builder $query, string $column, string $value): void
    {
        if (str_contains($column, '.')) {
            [$relation, $field] = explode('.', $column, 2);

            $query->whereHas($relation, function ($q) use ($field, $value) {
                $q->where($field, 'LIKE', "%{$value}%");
            });
        } else {
            $query->where($column, 'LIKE', "%{$value}%");
        }
    }

    protected function applyOrWhere(Builder $query, string $column, string $value): void
    {
        if (str_contains($column, '.')) {
            [$relation, $field] = explode('.', $column, 2);

            $query->orWhereHas($relation, function ($q) use ($field, $value) {
                $q->where($field, 'LIKE', "%{$value}%");
            });
        } else {
            $query->orWhere($column, 'LIKE', "%{$value}%");
        }
    }

    /* -------------------------------------------------
     | SORT
     |--------------------------------------------------*/

    protected function applySorting(Builder $query): void
    {
        $sortByArray = $this->request->query('sortBy', ['id']);
        $sortDirArray = $this->request->query('sortDir', ['asc']);

        if (!is_array($sortByArray)) {
            $sortByArray = [$sortByArray];
        }
        if (!is_array($sortDirArray)) {
            $sortDirArray = [$sortDirArray];
        }

        foreach ($sortByArray as $i => $column) {
            $dir = strtolower($sortDirArray[$i] ?? 'asc');

            if (!in_array($column, $this->sortable)) {
                continue;
            }

            if (!in_array($dir, ['asc', 'desc'])) {
                $dir = 'asc';
            }

            if (str_contains($column, '.')) {
                // sort po relacji -> JOIN
                [$relation, $field] = explode('.', $column, 2);
                $this->applyRelationSort($query, $relation, $field, $dir);
            } else {
                $query->orderBy($column, $dir);
            }
        }
    }

    protected function applyRelationSort(
        Builder $query,
        string $relation,
        string $field,
        string $direction
    ): void {
        $relationInstance = $query->getModel()->{$relation}();
        $relatedTable = $relationInstance->getRelated()->getTable();
        $parentTable = $query->getModel()->getTable();
        $foreignKey = $relationInstance->getForeignKeyName();
        $ownerKey = $relationInstance->getOwnerKeyName();
        

        if (!in_array($relatedTable, $this->joinedTables)) {
            $query->leftJoin(
                $relatedTable,
                "{$parentTable}.{$foreignKey}",
                '=',
                "{$relatedTable}.{$ownerKey}"
            );
            $this->joinedTables[] = $relatedTable;
        }


        $query->orderBy("{$relatedTable}.{$field}", $direction)
            ->select("{$parentTable}.*");
    }
}
