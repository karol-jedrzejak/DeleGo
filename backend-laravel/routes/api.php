<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\User\AuthenticationController;

use App\Http\Controllers\API\News\NewsController;

use App\Http\Controllers\API\Company\CompanyController;
use App\Http\Controllers\API\Company\EmployeeController;
use App\Http\Controllers\API\User\CarController;
use App\Http\Controllers\API\Delegation\DelegationController;
use App\Http\Controllers\API\Dictionaries\CurrencyController;

// Authentication
Route::prefix('v1')->group(function () {

    Route::post('register', [AuthenticationController::class, 'register']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('logout', [AuthenticationController::class, 'logout']);
        Route::get('user', [AuthenticationController::class, 'current_user_info']);

        // Currency
        Route::get('dictionaries/currencies', [CurrencyController::class, 'options']);

        // Car  
        Route::get('car/options', [CarController::class, 'options'])->middleware('permission:misc,cars,1');
        Route::apiResource('car', CarController::class)->middleware('permission:misc,cars,1');
        Route::put('car/{id}/restore', [CarController::class, 'restore'])->middleware('permission:admin,admin,1');
        Route::delete('car/{id}/destroy', [CarController::class, 'forceDelete'])->middleware('permission:admin,admin,1');

        // Delegations
        Route::get('delegation/options', [DelegationController::class, 'options'])->middleware('permission:misc,delegations,1');
        Route::get('delegation/status-list', [DelegationController::class, 'statusList'])->middleware('permission:misc,delegations,1');
        Route::apiResource('delegation', DelegationController::class)->middleware('permission:misc,delegations,1');
        Route::get('delegation/{id}/pdf', [DelegationController::class, 'pdf'])->middleware('permission:misc,delegations,1');
        
        // Admin
        Route::get('admin/user/{user}', [AuthenticationController::class, 'user_info'])->middleware('permission:admin,admin,1');
        Route::get('admin/users', [AuthenticationController::class, 'users_info'])->middleware('permission:admin,admin,1');
        Route::put('admin/users/update_permissions', [AuthenticationController::class, 'update_permissions'])->middleware('permission:admin,admin,1');

        // News
        Route::apiResource('news', NewsController::class);

        // Company
        Route::get('company/options', [CompanyController::class, 'options'])->middleware('permission:sales,companies,1');
        Route::apiResource('company', CompanyController::class)->middleware('permission:sales,companies,1');
        Route::put('company/{id}/restore', [CompanyController::class, 'restore'])->middleware('permission:admin,admin,1');
        Route::delete('company/{id}/destroy', [CompanyController::class, 'forceDelete'])->middleware('permission:admin,admin,1');

        // Company->Employee
        Route::get('employee/options', [EmployeeController::class, 'options'])->middleware('permission:sales,employees,1');
        Route::apiResource('company.employee', EmployeeController::class)->middleware('permission:sales,employees,1')->shallow();
        Route::put('employee/{id}/restore', [EmployeeController::class, 'restore'])->middleware('permission:admin,admin,1');
        Route::delete('employee/{id}/destroy', [EmployeeController::class, 'forceDelete'])->middleware('permission:admin,admin,1');


    });

});