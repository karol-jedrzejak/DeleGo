<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use App\Models\Car;
use App\Policies\CarPolicy;

use App\Models\Company;
use App\Policies\CompanyPolicy;
use App\Models\Employee;
use App\Policies\EmployeePolicy;


class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Car::class => CarPolicy::class,
        //Company::class => CompanyPolicy::class,
        //Employee::class => EmployeePolicy::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
