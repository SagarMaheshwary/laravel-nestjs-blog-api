<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Admin\Category\StoreRequest;
use App\Http\Requests\API\Admin\Category\UpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function __construct(private CategoryService $categoryService)
    {
        //
    }

    public function index(): JsonResponse
    {
        $categories = $this->categoryService->paginated(perPage());

        return jsonResponse([
            'categories' => CategoryResource::collection($categories)
                ->response()
                ->getData(),
        ]);
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $attributes = $request->safe()->only(['title', 'description', 'image']);

        $category = $this->categoryService->save($attributes);

        return jsonResponse([
            'category' => new CategoryResource($category),
        ], 'Created a new category.', 201);
    }

    public function show(int $id): JsonResponse
    {
        $category = $this->categoryService->findById($id);

        return jsonResponse([
            'category' => new CategoryResource($category),
        ]);
    }

    public function update(UpdateRequest $request, int $id): JsonResponse
    {
        $attributes = $request->safe()->only(['title', 'description', 'image']);

        $category = $this->categoryService->findById($id);

        $category = $this->categoryService->update($category, $attributes);

        return jsonResponse([
            'category' => new CategoryResource($category),
        ], 'Selected category has been updated.', 201);
    }
}
