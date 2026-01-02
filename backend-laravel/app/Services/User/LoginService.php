<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Auth;

use App\Models\User;

class LoginService
{
    public function login(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();
        
        $token = null;
        $error = null;
        $error_number = null;

        // E-mail nie istnieje
        if (!$user) {
            $error = 'Złe dane logowania.';
            $error_number = 401;
        }

        // Blokada użytkownika
        if ($user->active == 0) {
            $error = 'Konto zablokowane. Skontaktuj się z administratorem.';
            $error_number = 403;
        }

        if (!Auth::attempt($credentials)) {
            $user->failed_attempts += 1;

            // Blokada po 5 próbach
            if ($user->failed_attempts >= 5) {
                $user->active = 0;
            }

            $user->save();

            $error = 'Złe dane logowania.';
            $error_number = 401;
        } else {
            // Po udanym logowaniu reset prób
            $user->failed_attempts = 0;
            $user->save();

            /** @var \App\Models\User */
            $user = Auth::user();

            $token = $user->createToken('API Token')->plainTextToken;
        }

        return [
            'token' => $token,
            'error' => $error,
            'error_number' => $error_number
        ];
    }
}
