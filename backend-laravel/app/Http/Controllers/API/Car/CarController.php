<?php

namespace App\Http\Controllers\API\Car;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\User\CarRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CarController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $query = Car::filter($request);

        // razem z modelem user jeśli admin
        if ($user->isAdmin()) {
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

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->isAdmin() || !$data['user_id']) {
            $data['user_id'] = $user->id;
        }

        $newEntry = Car::create($data);
        return response()->json([
            'text' => 'Poprawnie dodano auto '.$newEntry->brand.' '.$newEntry->model.' '.$newEntry->registration_number.'.',
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
        $this->authorize('view', Car::class);
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

        // Tu jesli car był użyty w delegacji zablokuj dostep

        $car->update($data);
        return response()->json([
            'text' => 'Poprawnie zmieniono dane samochodu.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        $this->authorize('view', Car::class);
        $deleted_resource_name = $car->brand.' '.$car->model.' '.$car->registration_number;

        // Tu jesli car był użyty w delegacji zablokuj dostep

        $car->delete();
        return response()->json([
            'text' => 'Poprawnie usunięto auto '.$deleted_resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }
}
