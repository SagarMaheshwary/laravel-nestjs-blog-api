<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function __construct(private PostService $postService)
    {
        // 
    }

    public function index(): JsonResponse
    {
        $posts = $this->postService->paginated(perPage(), [
            'user:id,name,email',
            'categories',
        ]);

        return jsonResponse([
            'posts' => PostResource::collection($posts)
                ->response()
                ->getData(),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $post = $this->postService->findBySlug($slug, [
            'user:id,name,email',
            'categories',
        ]);

        return jsonResponse([
            'post' => new PostResource($post),
        ]);
    }
}
