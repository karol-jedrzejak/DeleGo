<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $department ,$resource, $level): Response
    {
        if (!$resource || !$level || !$department) {
            return response()->json(['error' => 'Invalid middleware parameters (Internal Error).'], 500);
        }

        $user_level = $request->user()->getPermissionLevel($resource,$department);
        
        if($user_level < $level)
        {
            return response()->json(['error' => 'Brak uprawnień do zasobu.'], 403);
        }
        
        return $next($request);

    }
}
