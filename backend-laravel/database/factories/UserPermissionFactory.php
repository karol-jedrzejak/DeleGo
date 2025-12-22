<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\PermissionType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UsersPermissions>
 */
class UserPermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'permission_type_id' => PermissionType::factory(),
            'level' => fake()->numberBetween(1, 5),
        ];
    }
}
