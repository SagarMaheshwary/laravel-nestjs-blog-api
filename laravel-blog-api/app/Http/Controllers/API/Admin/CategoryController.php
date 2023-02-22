<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Admin\Category\StoreRequest;
use App\Http\Requests\API\Admin\Category\UpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function __construct(private CategoryService $categoryService)
    {
        //
    }

    public function index()
    {
        $categories = $this->categoryService->paginated(perPage());

        return jsonResponse([
            'categories' => CategoryResource::collection($categories)
                ->response()
                ->getData(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $attributes = $request->safe()->only('title', 'description');

        //@TODO: upload image to S3
        $attributes['image'] = 'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA';

        $category = $this->categoryService->save($attributes);

        return jsonResponse([
            'category' => new CategoryResource($category),
        ], 'Created a new category.', 201);
    }

    public function show(int $id)
    {
        $category = $this->categoryService->findById($id);

        return jsonResponse([
            'category' => new CategoryResource($category),
        ]);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $attributes = $request->safe()->only('title', 'description');

        $category = $this->categoryService->findById($id);

        //@TODO: upload image to S3

        $category = $this->categoryService->update($category, $attributes);

        return jsonResponse([
            'category' => new CategoryResource($category),
        ], 'Selected category has been updated.', 201);
    }
}
