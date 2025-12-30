<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class BaseFilterOLD
{
    protected Request $request;
    protected array $sortable = [];
    protected array $searchable = [];

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

    protected function applySearch(Builder $query): void
    {
        $search = $this->request->query('search');
        $searchBy = $this->request->query('searchBy');
        
        if($searchBy && !$search && count($this->searchable))
        {
            $query->where(function ($q) use ($searchBy) {
                foreach ($searchBy as $column => $search) {
                    $q->Where($column, 'LIKE', "%{$search}%");
                }
            });
        }

        if ($search && !$searchBy && count($this->searchable)) {
            $query->where(function ($q) use ($search) {
                foreach ($this->searchable as $column) {
                    $q->orWhere($column, 'LIKE', "%{$search}%");
                }
            });
        }
    }

    protected function applySorting(Builder $query): void
    {
        $sortByArray = $this->request->query('sortBy', 'id');
        $sortDirArray = $this->request->query('sortDir', 'asc');

        $length = count($sortByArray);
        if($length == count($sortDirArray) && $length > 0 )
        {
            for ($i=0; $i < $length; $i++) { 
                
                if (!in_array($sortByArray[$i], $this->sortable)) {
                    $sortByArray[$i] = 'id';
                }

                if (!in_array(strtolower($sortDirArray[$i]), ['asc', 'desc'])) {
                    $sortDirArray[$i] = 'asc';
                }

                $query->orderBy($sortByArray[$i], $sortDirArray[$i]);
            }

        }

        /*    
        Pojedynczy Sort

        $sortBy = $this->request->query('sortBy', 'id');
        $sortDir = $this->request->query('sortDir', 'asc');

        if (!in_array($sortBy, $this->sortable)) {
            $sortBy = 'id';
        }

        if (!in_array(strtolower($sortDir), ['asc', 'desc'])) {
            $sortDir = 'asc';
        }

        $query->orderBy($sortBy, $sortDir);
        */

    }
}
