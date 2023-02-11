<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
        //   
    }

    public function index(Request $request)
    {
        return jsonResponse([
            'user' => new UserResource($request->user()),
        ]);
    }
}
