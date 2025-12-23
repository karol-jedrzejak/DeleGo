<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\User;
use App\Models\UserPermission;
use App\Models\PermissionType;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = PermissionType::all();

        $admin = User::factory()
            ->has(Car::factory()->count(2))
            ->create([
                'name' => 'Karol',
                'surname' => 'Jędrzejak',
                'position' => "Kierownik działu programowania",
                'phone_mobile' => '+48 693 462 163',
                'phone_landline' => '+48 11 22 33 456',
                'academic_titles_before' => 'mgr. inz.',
                'academic_titles_after' => '',
                'email' => 'karol.jedrzejak@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'remember_token' => Str::random(10),
                'active' => 1,
            ]);

        foreach ($types as $type) {
            UserPermission::create([
                'user_id' => $admin->id,
                'permission_type_id' => $type->id,
                'level' => 9,
            ]);
        }

        User::factory(10)
            ->has(Car::factory()->count(3))
            ->create()
            ->each(function ($user) use ($types) {
                foreach ($types->random(3) as $key => $type) {
                    if($key > 0)
                    {
                        UserPermission::create([
                            'user_id' => $user->id,
                            'permission_type_id' => $type->id,
                            'level' => rand(0, 3),
                        ]);
                    }
                }
            });
    }
}
