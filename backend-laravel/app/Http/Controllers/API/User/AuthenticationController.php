<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;

use App\Models\User;

use App\Http\Requests\User\SetUserPermissionsRequest;

use App\Http\Resources\User\UserShowResource;
use App\Http\Resources\User\UserIndexResource;

use App\Services\User\UserPermissionService;
use App\Services\User\LoginService;

class AuthenticationController extends Controller
{
    /**
     * Login user.
     */
    public function login(Request $request, LoginService $loginService)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $data = $loginService->login($request->only('email', 'password'));

        if($data['token'])
        {
            return response()->json(['token' => $data['token']]);
        } else {
            return response()->json(['message' => $data['error']], $data['error_number']);
        }
    }

    /**
     * Logour User.
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
    
    /**
     * Display current user info.
     */
    public function current_user_info(Request $request)
    {
        $user = $request->user()->load(['permissions','permissions.type']);
        return new UserShowResource($user);
    }

    /**
     * Display user info.
     */
    public function user_info(User $user)
    {
        return new UserShowResource($user);
    }

    /**
     * Display users info.
     */
    public function users_info(Request $request)
    {
        $search = $request->query('search');

        $query = User::with('permissions.type');

        $query->when($search, function ($q, $search) {
            // 1. Rozbijamy string po spacjach i usuwamy puste elementy
            $words = explode(' ', $search);
            $words = array_filter($words);

            // 2. Tworzymy grupę warunków ( nested where )
            $q->where(function ($innerQuery) use ($words) {
                foreach ($words as $word) {
                    // Każde słowo musi pasować do imienia LUB nazwiska
                    $innerQuery->where(function ($subQuery) use ($word) {
                        $subQuery->where('name', 'LIKE', "{$word}%")
                                ->orWhere('surname', 'LIKE', "{$word}%");
                    });
                }
            });
        });
        
        $users = $query
                ->orderBy('name')
                ->orderBy('surname')
                ->limit(10)
                ->get();

        return UserIndexResource::collection($users);

/*         $users = User::with('permissions.type')
                ->orderBy('name')
                ->orderBy('surname')
                ->get();
        return UserIndexResource::collection($users); */
    }

    /**
     * Display users info.
     */
    public function update_permissions(SetUserPermissionsRequest $request,UserPermissionService $permissionService)
    {
        $data = $request->validated();

        $permissionService->updateUserPermissions(
            $data['id'],
            $data['permissions']
        );

        return response()->json([
            'text' => 'Poprawnie zaktualizowano uprawnienia usera.',
            'type' => 'message',
            'status' => 'success',
        ]);
    }
}

/*     public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'active' => 0,
            'password' => Hash::make($request->password)
        ]);
        return response()->json(['message' => 'Poprawna rejestracja']);
    } */