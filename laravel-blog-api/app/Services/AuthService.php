<?php

namespace App\Services;

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

        $token = $user->createToken('app')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }
}
