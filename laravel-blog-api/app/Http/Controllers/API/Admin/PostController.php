<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Admin\Post\StoreRequest;
use App\Http\Requests\API\Admin\Post\UpdateRequest;
use App\Http\Resources\PostResource;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public function __construct(private PostService $postService)
    {
        //
    }

    public function index(): JsonResponse
    {
        $posts = $this->postService->paginated(perPage(), ['categories']);

        return jsonResponse([
            'posts' => PostResource::collection($posts)
                ->response()
                ->getData(),
        ]);
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $attributes = $request->safe()->only(['title', 'body', 'categories', 'image']);

        $attributes['user_id'] = $request->user()->id;
        $post = $this->postService->save($attributes);

        if (!$post) {
            return jsonResponse([], 'Unable to create post.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return jsonResponse([
            'post' => new PostResource($post),
        ], 'Created a new post.', Response::HTTP_CREATED);
    }

    public function show(int $id): JsonResponse
    {
        $post = $this->postService->findById($id, ['categories']);

        return jsonResponse([
            'post' => new PostResource($post),
        ]);
    }

    public function update(UpdateRequest $request, int $id): JsonResponse
    {
        $attributes = $request->safe()->only(['title', 'body', 'categories', 'image']);

        $post = $this->postService->findById($id);

        $post = $this->postService->update($post, $attributes);

        if (!$post) {
            return jsonResponse([], 'Unable to create post.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return jsonResponse([
            'post' => new PostResource($post),
        ], 'Selected post has been updated.');
    }
}
