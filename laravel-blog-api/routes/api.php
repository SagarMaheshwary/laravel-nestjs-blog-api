<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\ProfileController;
use App\Http\Controllers\API\Admin\PostController as AdminPostController;
use App\Http\Controllers\API\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\API\Auth\RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [RegisterController::class, 'register']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout']);
        Route::get('/profile', [ProfileController::class, 'index']);
    });
});

Route::get('/home', [HomeController::class, 'index']);

Route::prefix('/posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/{slug}', [PostController::class, 'show']);

    Route::get('/{id}/likes', [PostController::class, 'likes']);
    Route::put('/{id}/likes', [PostController::class, 'toggleLike'])
        ->middleware('auth:sanctum');

    Route::prefix('{id}/comments')->group(function () {
        Route::get('/', [CommentController::class, 'index']);
        Route::get('/{commentId}/replies', [CommentController::class, 'replies']);
        Route::get('/{commentId}/likes', [CommentController::class, 'likes']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/', [CommentController::class, 'store']);
            Route::put('/{commentId}', [CommentController::class, 'update']);

            Route::put('/{commentId}/likes', [CommentController::class, 'toggleLike']);
        });
    });
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::apiResource('/posts', AdminPostController::class)->except('destroy');
    Route::apiResource('/categories', AdminCategoryController::class)->except('destroy');
});
