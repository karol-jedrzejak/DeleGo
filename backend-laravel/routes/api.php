<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthenticationController;

use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\EmployeeController;

// Authentication
Route::prefix('v1')->group(function () {

    Route::post('register', [AuthenticationController::class, 'register']);
    Route::post('login', [AuthenticationController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('logout', [AuthenticationController::class, 'logout']);
        Route::get('user', [AuthenticationController::class, 'user_info'])->middleware('permission:admin,admin,1');

        // Admin
        Route::get('admin/users', [AuthenticationController::class, 'users_info'])->middleware('permission:admin,admin,1');
        Route::put('admin/users/update_permissions', [AuthenticationController::class, 'update_permissions'])->middleware('permission:admin,admin,1');

        // News
        Route::apiResource('news', NewsController::class);

        // Companies
        Route::apiResource('company', CompanyController::class)->middleware('permission:misc,companies,1');
        Route::apiResource('company.employee', EmployeeController::class)->middleware('permission:misc,employees,1')->shallow();
    });

});