<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(private UserService $userService)
    {
        //
    }

    public function authenticate(string $email, string $password): array
    {
        $user = $this->userService->findByEmail($email);

        if (!Hash::check($password, $user->password)) {
            return false;
        }

        return [
            'user'  => $user,
            'token' => $this->issueToken($user),
        ];
    }

    public function issueToken(User $user, $name = 'app')
    {
        return $user->createToken($name)->plainTextToken;
    }
}
