<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function __construct(private User $user)
    {
        // 
    }

    public function findById(int $id): User|null
    {
        return $this->user->find($id);
    }

    public function findByEmail(string $email): User|null
    {
        return $this->user->where('email', $email)->first();
    }

    public function createUser(array $attributes): User
    {
        return $this->user->create($attributes);
    }
}
