<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Comment\StoreRequest;
use App\Http\Requests\API\Comment\UpdateRequest;
use App\Http\Resources\CommentResource;
use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct(private CommentService $commentService)
    {
        //
    }

    public function index(int $id): JsonResponse
    {
        $comments = $this->commentService->paginatedByPost($id, perPage());

        return jsonResponse([
            'comments' => CommentResource::collection($comments)
                ->response()
                ->getData(),
        ]);
    }

    public function replies(int $id, int $commentId): JsonResponse
    {
        $comments = $this->commentService->paginatedReplies($commentId, perPage());

        return jsonResponse([
            'comments' => CommentResource::collection($comments)
                ->response()
                ->getData(),
        ]);
    }

    public function store(StoreRequest $request, int $id): JsonResponse
    {
        $attributes = $request->safe()->only('body');
        $attributes['post_id'] = $id;
        $attributes['user_id'] = Auth::id();

        $comment = $this->commentService->save($attributes);

        return jsonResponse([
            'comment' => new CommentResource($comment),
        ], 'Comment posted.', Response::HTTP_CREATED);
    }

    public function update(UpdateRequest $request, int $id, int $commentId): JsonResponse
    {
        $comment = $this->commentService->find($commentId, $id);

        $comment = $this->commentService->update(
            $comment,
            $request->safe()->only('body')
        );

        return jsonResponse([
            'comment' => new CommentResource($comment),
        ], 'Selected comment has been updated.');
    }
}
