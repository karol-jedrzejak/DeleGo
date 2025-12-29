<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Models\Car;
use App\Http\Requests\User\CarRequest;

class CarController extends Controller
{
    // Dla Policies (plus AuthService Provider w App/Providers)
    use AuthorizesRequests;
    public function __construct()
    {
        $this->authorizeResource(Car::class,'car');
    }
    

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

        if (!$user->isAdmin()) {
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
        return response()->json($car);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CarRequest $request, Car $car)
    {
        $request->validated();
        $data = $request->post();

        // Tu jesli car był użyty w delegacji zablokuj edycje

        $car->update($data);
        return response()->json([
            'text' => 'Poprawnie zmieniono dane samochodu.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }

    /**
     * Soft delete the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        $resource_name = $car->brand.' '.$car->model.' '.$car->registration_number;
        $car->delete();
        return response()->json([
            'text' => 'Poprawnie zdeaktywowano auto '.$resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Restore the specified resource.
     */
    public function restore($id)
    {
        $car = Car::onlyTrashed()->findOrFail($id);
        $this->authorize('restore', Car::class);

        $resource_name = $car->brand.' '.$car->model.' '.$car->registration_number;
        $car->restore();
        return response()->json([
            'text' => 'Poprawnie przywrócono auto '. $resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }

    /**
     * Permanently remove the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $car = Car::onlyTrashed()->findOrFail($id);
        $this->authorize('forceDelete', Car::class);

        // Tu jesli car był użyty w delegacji zablokuj usuwanie
        $resource_name = $car->brand.' '.$car->model.' '.$car->registration_number;

        $car->forceDelete();
        return response()->json([
            'text' => 'Poprawnie usunięto auto '.$resource_name.'.',
            'type' => 'message',
            'status' => 'success',
        ],200);
    }
}
