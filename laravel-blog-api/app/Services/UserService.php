<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(private User $user)
    {
        // 
    }

    public function findById(int $id): ?User
    {
        return $this->user->find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->user->where('email', $email)->first();
    }

    public function save(array $attributes): User
    {
        $user = $this->user->newInstance();
        $user->name = $attributes['name'];
        $user->email = $attributes['email'];
        $user->password = Hash::make($attributes['password']);
        $user->image = $attributes['image']->store('users');
        $user->role = $attributes['role'];
        $user->save();

        return $user;
    }
}
