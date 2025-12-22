<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\PermissionType;
use App\Models\UserPermission;

use App\Http\Requests\User\SetUserPermissionsRequest;

use \stdClass;

class AuthenticationController extends Controller
{
    /**
     * Login user.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // E-mail nie istnieje
        if (!$user) {
            return response()->json(['message' => 'Złe dane logowania.'], 401);
        }

        // Blokada użytkownika
        if ($user->active == 0) {
            return response()->json(['message' => 'Konto zablokowane. Skontaktuj się z administratorem.'], 403);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {

            $user->failed_attempts += 1;

            // Blokada po 5 próbach
            if ($user->failed_attempts >= 5) {
                $user->active = 0;
            }

            $user->save();

            return response()->json(['message' => 'Złe dane logowania'], 401);
        }

        // Po udanym logowaniu reset prób
        $user->failed_attempts = 0;
        $user->save();

        /** @var \App\Models\User */
        $user = Auth::user();

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json(['token' => $token]);
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
     * Display single user info.
     */
    public function user_info(Request $request)
    {
        $permission_types = PermissionType::all();

        $user = $request->user()->load([
        'permissions',
        'permissions.type'
        ]);

        $all_permissions = [];

        // Wszystkie Permission jako zera
        foreach ($permission_types as $permission) {
            $dep = $permission['department'];
            $res = $permission['resource'];

            // jeśli departament jeszcze nie istnieje → tworzymy
            if (!isset($all_permissions[$dep])) {
                $all_permissions[$dep] = [];
            }

            // dodajemy resource ustawiając wartość 0
            $all_permissions[$dep][$res] = 0;
        }

        // Jesli istnieje pivot zmieniamy permission z zera na właściwe
        foreach ($user->permissions as $key => $permission_unformatted) {
            $all_permissions[$permission_unformatted->type->department][$permission_unformatted->type->resource] = $permission_unformatted->level;
        }

        unset($user->permissions);
        $user->permissions = $all_permissions;

        return response()->json($user);
    }

    /**
     * Display users info.
     */
    public function users_info()
    {
        // wszystkie możliwe permission types
        $permission_types = PermissionType::orderBy('department','asc')->orderBy('resource','asc')->get();

        // budujemy "szablon" permissionów z zerami
        $permissionTemplate = [];

        foreach ($permission_types as $permission) {
            $dep = $permission->department;
            $res = $permission->resource;

            if (!isset($permissionTemplate[$dep])) {
                $permissionTemplate[$dep] = [];
            }

            $permissionTemplate[$dep][$res] = 0;
        }

        // pobieramy userów z permissionami
        $users = User::with(['permissions.type'])->orderBy('name','asc')->orderBy('surname','asc')->get();

        foreach ($users as $user) {
            // kopiujemy szablon (ważne!)
            $all_permissions = $permissionTemplate;

            // nadpisujemy realnymi wartościami z pivotu
            foreach ($user->permissions as $permission) {
                $all_permissions
                    [$permission->type->department]
                    [$permission->type->resource]
                    = $permission->level;
            }

            // podmieniamy relację
            unset($user->permissions);
            $user->permissions = $all_permissions;
        }

        return response()->json($users);
    }

    /**
     * Display users info.
     */
    public function update_permissions(SetUserPermissionsRequest $request)
    {
        $request->validated();
        $data = $request->post();

        foreach ($data['permissions'] as $department => $permission) {
            foreach ($permission as $resource => $level) {

                $permission_type = PermissionType::where('department', $department)
                    ->where('resource', $resource)
                    ->value('id');

                if($permission_type)
                {
                    $permission = UserPermission::where('user_id', $data['id'])
                        ->where('permission_type_id', $permission_type)
                        ->first();

                    if($permission)
                    {
                        $permission->update([
                            'level' => $level
                        ]);
                    } else {
                        UserPermission::create([
                            'level' => $level,
                            'user_id' => $data['id'],
                            'permission_type_id' => $permission_type,
                        ]);
                    }
                }
            }
        }

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