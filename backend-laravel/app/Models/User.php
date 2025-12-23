<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\News;
use App\Models\UserPermission;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'surname',
        'phone_mobile',
        'phone_landline',
        'academic_titles_before',
        'academic_titles_after',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        "failed_attempts",
        "active",
        "created_at",
        "updated_at",
        "email_verified_at",
        "isAdmin"
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(UserPermission::class);
    }

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class);
    }

    public function isAdmin(): bool
    {
        return $this->getPermissionLevel('admin', 'admin') > 0;
    }

    public function getPermissionLevel(string $resource, string $department): ?int
    {
        $permission = $this->permissions
            ->first(fn($p) => 
                $p->type->resource === $resource &&
                $p->type->department === $department
            );

        return $permission ? $permission->level : null;
    }
}
