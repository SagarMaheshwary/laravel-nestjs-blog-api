<?php

namespace App\Services;

use App\Models\Post;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        return $this->post->with($relations)->findOrFail($id);
    }

    public function findBySlug(string $slug, array $relations = []): ?Post
    {
        return $this->post->with($relations)
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function latest(int $limit = 10, array $relations = []): Collection
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
            ->take($limit)
            ->latest()
            ->get($columns);
    }

    public function save(array $attributes = []): Post|bool
    {
        try {
            DB::beginTransaction();

            $post = $this->post->newInstance();
            $post->slug = Str::slug($attributes['title']);
            $post->title = $attributes['title'];
            $post->body = $attributes['body'];
            $post->image = $attributes['image']->store('posts');
            $post->user_id = $attributes['user_id'];
            $post->save();

            $post->categories()->attach($attributes['categories']);

            DB::commit();

            $post->load('categories');

            return $post;
        } catch (Exception $ex) {
            DB::rollBack();
            report($ex);

            return false;
        }
    }

    public function update(Post $post, array $attributes): Post|bool
    {
        try {
            DB::beginTransaction();

            $post->title = $attributes['title'];
            $post->slug  = Str::slug($attributes['title']);
            $post->body = $attributes['body'];

            if (isset($attributes['image'])) {
                $imageToDelete = $post->image;

                $post->image = $attributes['image']->store('posts');
                Storage::delete($imageToDelete);
            }

            $post->save();

            $post->categories()->sync($attributes['categories']);

            DB::commit();

            $post->load('categories');

            return $post;
        } catch (Exception $ex) {
            DB::rollBack();
            report($ex);

            return false;
        }
    }
}
