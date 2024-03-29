<?php

namespace App\Services;

use App\Models\Comment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class CommentService
{
    public function __construct(private Comment $comment)
    {
        //
    }

    public function paginatedByPost(int $postId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->comment->with('user:id,name,email')
            ->withCount('replies')
            ->whereNull('parent_id')
            ->where('post_id', $postId)
            ->latest()
            ->paginate($perPage);
    }

    public function paginatedReplies(int $commentId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->comment->with('user:id,name,email')
            ->where('parent_id', $commentId)
            ->latest()
            ->paginate($perPage);
    }

    public function save(array $attributes): ?Comment
    {
        $comment = $this->comment->newInstance();
        $comment->post_id = $attributes['post_id'];
        $comment->user_id = $attributes['user_id'];
        $comment->body = $attributes['body'];
        $comment->save();

        return $comment;
    }

    public function update(Comment $comment, array $attributes): ?Comment
    {
        $comment->body = $attributes['body'];
        $comment->save();

        return $comment;
    }

    public function find(int $id, int $postId = null): ?Comment
    {
        return $this->comment->where('id', $id)
            ->when($postId, fn (Builder $query) => $query->where('post_id', $postId))
            ->firstOrFail();
    }

    public function likes(Comment $comment, array $relations = []): Collection
    {
        //@SUGGEST: can be paginated?
        return $comment->likes()->with($relations)->get();
    }

    public function toggleLike(Comment $comment, int $userId): bool
    {
        if ($comment->likes()->where('user_id', $userId)->exists()) {
            $comment->likes()->where('user_id', $userId)->delete();

            return false;
        }

        $comment->likes()->create([
            'user_id' => $userId,
        ]);

        return true;
    }
}
