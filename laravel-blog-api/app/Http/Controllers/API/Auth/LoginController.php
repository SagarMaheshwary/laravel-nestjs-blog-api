<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    public function __construct(private AuthService $authService)
    {
        //
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->safe()->only(['email', 'password']);

        $response = $this->authService->authenticate(
            $credentials['email'],
            $credentials['password']
        );

        if (!$response) {
            return jsonResponse([
                'errors' => [
                    'email' => ['Invalid credentials.'],
                ],
            ], 'Validation Failed.', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return jsonResponse([
            'user'  => new UserResource($response['user']),
            'token' => $response['token'],
        ], 'You are logged in.');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return jsonResponse([], 'Logout successful.');
    }
}
