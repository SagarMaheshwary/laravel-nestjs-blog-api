<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class PostService
{
    public function __construct(private Post $post)
    {
        // 
    }

    public function paginated(int $perPage = 12, array $relations = []): LengthAwarePaginator
    {
        $columns = [
            'id',
            'slug',
            'title',
            DB::raw('SUBSTRING(body, 0, 300) as body'),
            'user_id',
            'image',
            'created_at',
        ];

        return $this->post->with($relations)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, $columns);
    }

    public function findById(int $id, array $relations = []): ?Post
    {
        return $this->post->with($relations)->find($id);
    }

    public function findBySlug(string $slug, array $relations = []): ?Post
    {
        return $this->post->with($relations)
            ->where('slug', $slug)
            ->first();
    }

    public function getLatestPosts(int $limit = 10, array $relations = []): Collection
    {
        $columns = [
            'id',
            'slug',
            'title',
            DB::raw('SUBSTRING(body, 0, 300) as body'),
            'user_id',
            'image',
            'created_at',
        ];

        return $this->post
            ->with($relations)
            ->take($limit)
            ->orderBy('created_at', 'desc')
            ->get($columns);
    }
}
