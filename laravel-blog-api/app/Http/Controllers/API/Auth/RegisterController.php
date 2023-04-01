<?php

namespace App\Http\Controllers\API\Auth;

use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    public function __construct(
        private UserService $userService,
        private AuthService $authService
    ) {
        //
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $attributes = $request->only(['name', 'image', 'email', 'password']);
        $attributes['role'] = 'user';

        $user = $this->userService->save($attributes);
        $token = $this->authService->issueToken($user);

        return jsonResponse([
            'user'  => new UserResource($user),
            'token' => $token,
        ], 'User registered.', Response::HTTP_CREATED);
    }
}
