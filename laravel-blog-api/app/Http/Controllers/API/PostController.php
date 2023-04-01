<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\LikeResource;
use App\Http\Resources\PostResource;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

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
            'categories:id,title',
        ]);

        return jsonResponse([
            'posts' => PostResource::collection($posts)
                ->response()
                ->getData(),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $relations = [
            'user:id,name,email',
            'categories:id,title,description',
        ];

        $post = $this->postService->findBySlug($slug, $relations, ['likes']);

        return jsonResponse([
            'post' => new PostResource($post),
        ]);
    }

    public function likes(int $id): JsonResponse
    {
        $post = $this->postService->findById($id);
        $likes = $this->postService->likes($post, ['user:id,name']);

        return jsonResponse([
            'likes' => LikeResource::collection($likes),
        ]);
    }

    public function toggleLike(int $id): JsonResponse
    {
        $post = $this->postService->findById($id);
        $liked = $this->postService->toggleLike($post, Auth::id());

        return jsonResponse([
            'liked' => $liked,
        ]);
    }
}
