<?php

namespace App\Http\Controllers\API\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Models\Company;
use App\Models\Employee;
use App\Http\Requests\Company\Employee\EmployeeRequest;


class EmployeeController extends Controller
{
    use AuthorizesRequests;
    // Dla crud bez policy. Policy tylko dla restore i forceDestroy
    /*     
    public function __construct()
    {
        $this->authorizeResource(Employee::class,'employee');
    }*/

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Company $company)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $query = Employee::where('company_id', $company->id)->filter($request);

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
     * Soft delete the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $resource_name = $employee->name.' '.$employee->surname;
        $employee->delete();
        return response()->json([
            'text' => 'Poprawnie zdeaktywowano pracownika '. $resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Restore the specified resource.
     */
    public function restore($id)
    {
        $employee = Employee::onlyTrashed()->findOrFail($id);
        $this->authorize('restore', Employee::class);
        $resource_name = $employee->name.' '.$employee->surname;
        $employee->restore();
        return response()->json([
            'text' => 'Poprawnie przywrócono pracownika '.$resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $employee = Employee::onlyTrashed()->findOrFail($id);
        $this->authorize('forceDelete', Employee::class);
        $resource_name = $employee->name.' '.$employee->surname;
        $employee->forceDelete();
        return response()->json([
            'text' => 'Poprawnie usunięto pracownika '. $resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }
}
