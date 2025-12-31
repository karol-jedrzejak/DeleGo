<?php

namespace App\Http\Controllers\API\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Models\Company;
use App\Http\Requests\Company\CompanyRequest;

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

        return response()->json(
            $query
                ->paginate($request->query('perPage', 10))
                ->withPath('')
        );
    }

    /**
     * Display a list for select input.
     */
    public function options(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $search = $request->query('search');

        $query = Company::query()
            ->select(['id', 'name_short']);

        if ($user->isAdmin()) {
            $query->withTrashed();
        }

        $companies = $query->when($search, function ($query, $search) {
                $query->where('name_short', 'LIKE', "{$search}%");
            })
            ->orderBy('name_short')
            ->limit(15)
            ->get();

        return response()->json($companies);
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
        return response()->json($company);
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
