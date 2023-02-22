<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Admin\Post\StoreRequest;
use App\Http\Requests\API\Admin\Post\UpdateRequest;
use App\Http\Resources\PostResource;
use App\Services\PostService;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public function __construct(private PostService $postService)
    {
        //
    }

    public function index()
    {
        $posts = $this->postService->paginated(perPage(), ['categories']);

        return jsonResponse([
            'posts' => PostResource::collection($posts)
                ->response()
                ->getData(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $attributes = $request->safe()
            ->only(['title', 'body', 'categories']);

        $attributes['user_id'] = $request->user()->id;

        //@TODO: upload image to S3
        $attributes['image'] = 'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA';

        $post = $this->postService->save($attributes);

        if (!$post) {
            return jsonResponse([], 'Unable to create post.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return jsonResponse([
            'post' => new PostResource($post),
        ], 'Created a new post.', Response::HTTP_CREATED);
    }

    public function show(int $id)
    {
        $post = $this->postService->findById($id, ['categories']);

        return jsonResponse([
            'post' => new PostResource($post),
        ]);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $attributes = $request->safe()
            ->only(['title', 'body', 'categories']);

        $post = $this->postService->findById($id);

        //@TODO: upload image on S3

        $post = $this->postService->update($post, $attributes);

        if (!$post) {
            return jsonResponse([], 'Unable to create post.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return jsonResponse([
            'post' => new PostResource($post),
        ], 'Selected post has been updated.');
    }
}
