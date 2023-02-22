<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(private Category $category)
    {
        //
    }

    public function findMany(array $ids): Collection
    {
        return $this->category->find($ids);
    }

    public function popularByPosts(int $limit = 10): Collection
    {
        return $this->category->withCount(['posts'])
            ->take($limit)
            ->orderBy('posts_count', 'desc')
            ->get();
    }

    public function paginated(int $perPage = 12): LengthAwarePaginator
    {
        return $this->category->latest()->paginate($perPage);
    }

    public function findById(int $id): Category
    {
        return $this->category->findOrFail($id);
    }

    public function save(array $attributes): Category
    {
        $category = $this->category->newInstance();
        $category->title = $attributes['title'];
        $category->description = $attributes['description'];
        $category->image = $attributes['image'];
        $category->save();

        return $category;
    }

    public function update(Category $category, array $attributes): Category
    {
        $category->title = $attributes['title'];
        $category->description = $attributes['description'];

        if (isset($attributes['image'])) {
            $category->image = $attributes['image'];
        }

        $category->save();

        return $category;
    }
}
