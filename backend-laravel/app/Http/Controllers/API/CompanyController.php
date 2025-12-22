<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;


use App\Http\Requests\Company\CompanyRequest;


class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(
            Company::filter($request)
            ->paginate($request->query('perPage', 10))
            ->withPath('')
        );
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
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        if($company->has_employees)
        {
            return response()->json([
                'text' => 'Nie można usunąć firmy '.$company->name_short.' gdy przypisani są do niej pracownicy. Usuń pracowników lub zmień status firmy na nieaktywny.',
                'type' => 'page',
                'status' => 'error',
            ], 409);
        }

        $deleted_resource_name = $company->name_short;
        $company->delete();
        return response()->json([
            'text' => 'Poprawnie usunięto firmę '.$deleted_resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ]);;
    }
}
