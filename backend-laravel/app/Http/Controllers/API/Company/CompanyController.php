<?php

namespace App\Http\Controllers\API\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Models\Company;
use App\Http\Requests\Company\CompanyRequest;

use App\Http\Resources\Company\CompanyIndexResource;
use App\Http\Resources\Company\CompanyShowResource;
use App\Http\Resources\Company\CompanyOptionsResource;

class CompanyController extends Controller
{
    use AuthorizesRequests;
    // Dla crud bez policy. Policy tylko dla restore i forceDestroy
    /*     
    public function __construct()
    {
        $this->authorizeResource(Company::class,'company');
    }*/

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $query = Company::filter($request);

        if ($user->isAdmin()) {
            $query->withTrashed();
        }

        $companies = $query
            ->paginate($request->query('perPage', 10));

        return CompanyIndexResource::collection($companies)->withPath('');
    }

    /**
     * Return a list for select input.
     */
    public function options(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $search = $request->query('search');

        $query = Company::query()
            ->select(['id', 'name_short', 'name_complete','deleted_at']);

        if ($user->isAdmin()) {
            $query->withTrashed();
        }

        $query->when($search, function ($q, $search) {
            // 1. Rozbijamy string po spacjach i usuwamy puste elementy
            $words = explode(' ', $search);
            $words = array_filter($words);

            // 2. Tworzymy grupę warunków ( nested where )
            $q->where(function ($innerQuery) use ($words) {
                foreach ($words as $word) {
                    // Każde słowo musi pasować do imienia LUB nazwiska
                    $innerQuery->where(function ($subQuery) use ($word) {
                        $subQuery->where('name_short', 'LIKE', "%{$word}%")
                                ->orWhere('name_complete', 'LIKE', "%{$word}%");
                    });
                }
            });
        });

        $companies = $query
            ->orderBy('name_short')
            ->limit(10)
            ->get();

        return CompanyOptionsResource::collection($companies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {
        $request->validated();
        $data = $request->post();
        $newEntry = Company::create($data);
        return response()->json([
            'text' => 'Poprawnie dodano firmę '.$newEntry->name_short.'.',
            'type' => 'message',
            'status' => 'success',
            'id' => $newEntry->id,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return new CompanyShowResource($company);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $request->validated();
        $data = $request->post();
        $company->update($data);
        return response()->json([
            'text' => 'Poprawnie zmieniono dane firmy '.$company->name_short.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Soft delete the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $resource_name = $company->name_short;
        $company->delete();
        return response()->json([
            'text' => 'Poprawnie zdeaktywowano firmę '.$resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Restore the specified resource.
     */
    public function restore($id)
    {
        $company = Company::onlyTrashed()->findOrFail($id);
        $this->authorize('restore', Company::class);
        $company->restore();
        $resource_name = $company->name_short;
        return response()->json([
            'text' => 'Poprawnie przywrócono firmę '.$resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $company = Company::onlyTrashed()->findOrFail($id);
        $this->authorize('forceDelete', Company::class);
        if($company->has_employees)
        {
            return response()->json([
                'text' => 'Nie można usunąć firmy '.$company->name_short.' gdy przypisani są do niej pracownicy.',
                'type' => 'page',
                'status' => 'error',
            ], 409);
        }

        $resource_name = $company->name_short;
        $company->forceDelete();
        return response()->json([
            'text' => 'Poprawnie usunięto firmę '.$resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }
}
