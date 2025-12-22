<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Car\CarRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CarController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = User::with('permissions.type')->find(Auth::id());
        $query = Car::filter($request);

        // razem z modelem user jeśli admin
        if ($user->getPermissionLevel('admin', 'admin') > 0) {
            $query->with('user');
        } else{
            $query->where('user_id', $user->id);
        }

        $cars = $query->paginate($request->query('perPage', 10))
                    ->withPath('');
        return response()->json($cars);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CarRequest $request)
    {
        
        $request->validated();
        $data = $request->post();
        $newEntry = Car::create($data);
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
    public function show(Car $car)
    {

        return response()->json($car);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CarRequest $request, Car $car)
    {
        $this->authorize('view', Car::class);
        $request->validated();
        $data = $request->post();
        $car->update($data);
        return response()->json([
            'text' => 'Poprawnie zmieniono dane firmy '.$car->name_short.'.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
/*         if($car->has_employees)
        {
            return response()->json([
                'text' => 'Nie można usunąć auta '.$car->name_short.' jeśli zostało użyte przynajmniej raz w trakcie delegacji. Zmiast usuwać zarchiwizuj.',
                'type' => 'page',
                'status' => 'error',
            ], 409);
        } */

        $deleted_resource_name = $car->name_short;
        $car->delete();
        return response()->json([
            'text' => 'Poprawnie usunięto firmę '.$deleted_resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }
}
