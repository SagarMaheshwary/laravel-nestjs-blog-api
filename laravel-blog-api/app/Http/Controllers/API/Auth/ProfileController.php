<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
        //   
    }

    public function index(Request $request): JsonResponse
    {
        return jsonResponse([
            'user' => new UserResource($request->user()),
        ]);
    }
}
