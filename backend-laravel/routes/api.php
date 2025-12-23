<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\User\AuthenticationController;

use App\Http\Controllers\API\News\NewsController;

use App\Http\Controllers\API\Company\CompanyController;
use App\Http\Controllers\API\Company\EmployeeController;
use App\Http\Controllers\API\User\CarController;

// Authentication
Route::prefix('v1')->group(function () {

    Route::post('register', [AuthenticationController::class, 'register']);
    Route::post('login', [AuthenticationController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('logout', [AuthenticationController::class, 'logout']);
        Route::get('user', [AuthenticationController::class, 'user_info']);

        // Car
        Route::apiResource('car', CarController::class)->middleware('permission:misc,cars,1');
        Route::put('car/{id}/restore', [CarController::class, 'restore'])->middleware('permission:admin,admin,1');
        Route::delete('car/{id}/destroy', [CarController::class, 'forceDelete'])->middleware('permission:admin,admin,1');

        // Admin
        Route::get('admin/users', [AuthenticationController::class, 'users_info'])->middleware('permission:admin,admin,1');
        Route::put('admin/users/update_permissions', [AuthenticationController::class, 'update_permissions'])->middleware('permission:admin,admin,1');

        // News
        Route::apiResource('news', NewsController::class);

        // Company
        Route::apiResource('company', CompanyController::class)->middleware('permission:sales,companies,1');
        Route::put('company/{id}/restore', [CompanyController::class, 'restore'])->middleware('permission:admin,admin,1');
        Route::delete('company/{id}/destroy', [CompanyController::class, 'forceDelete'])->middleware('permission:admin,admin,1');

        // Company->Employee
        Route::apiResource('company.employee', EmployeeController::class)->middleware('permission:sales,employees,1')->shallow();
        Route::put('employee/{id}/restore', [EmployeeController::class, 'restore'])->middleware('permission:admin,admin,1');
        Route::delete('employee/{id}/destroy', [EmployeeController::class, 'forceDelete'])->middleware('permission:admin,admin,1');

    });

});