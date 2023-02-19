<?php

namespace App\Services;

use App\Models\Category;
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

    public function getPopularCategories(int $limit = 10): Collection
    {
        return $this->category
            ->withCount(['posts'])
            ->take($limit)
            ->orderBy('posts_count', 'desc')
            ->get();
    }
}
