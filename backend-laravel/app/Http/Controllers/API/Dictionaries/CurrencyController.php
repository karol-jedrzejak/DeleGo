<?php

namespace App\Http\Controllers\API\Dictionaries;

use App\Http\Controllers\Controller;

use App\Models\Currency;
use App\Http\Resources\Dictionaries\CurrencyOptionsResource;

class CurrencyController extends Controller
{
    /**
     * Display options.
     */
    public function options()
    {
        $query = Currency::query()
            ->select([ 'code','name','symbol'])
            ->orderBy('name')
            ->get();
        return CurrencyOptionsResource::collection($query);
    }
}
