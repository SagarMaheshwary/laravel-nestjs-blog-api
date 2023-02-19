<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Services\CategoryService;
use App\Services\PostService;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __construct(
        private PostService $postService,
        private CategoryService $categoryService
    ) {
        //
    }

    public function index()
    {
        $posts = $this->postService->getLatestPosts(10, [
            'user:id,name',
            'categories:id,title,image',
        ]);

        $categories = $this->categoryService->getPopularCategories();

        return jsonResponse([
            'posts'      => PostResource::collection($posts),
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}
