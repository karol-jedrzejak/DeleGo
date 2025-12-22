<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Employee;


use App\Http\Requests\Company\Employee\EmployeeRequest;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Company $company)
    {
        return response()->json(
            Employee::where('company_id', $company->id)
            ->filter($request)
            ->paginate($request->query('perPage', 10))
            ->withPath('')
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request, Company $company)
    {
        $request->validated();
        $data = $request->post();
        $data['company_id'] = $company->id;
        $newEntry = Employee::create($data);
        return response()->json([
            'text' => 'Poprawnie dodano pracownika '.$newEntry->name.' '.$newEntry->surname.'.',
            'type' => 'message',
            'status' => 'success',
            'id' => $newEntry->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return response()->json($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, Employee $employee)
    {
        $request->validated();
        $data = $request->post();
        $employee->update($data);
        return response()->json([
            'text' => 'Poprawnie zaktualizowano pracownika '.$employee->name.' '.$employee->surname.'.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $deleted_resource_name = $employee->name.' '.$employee->surname;
        $employee->delete();
        return response()->json([
            'text' => 'Poprawnie usunięto pracownika '. $deleted_resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }
}
