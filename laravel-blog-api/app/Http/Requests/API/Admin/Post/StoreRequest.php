<?php

namespace App\Http\Requests\API\Admin\Post;

use App\Rules\API\ValidCategoriesRule;
use App\Services\CategoryService;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(CategoryService $categoryService)
    {
        return [
            'title'        => 'required|min:5|max:190|unique:posts', //unique for slug
            'body'         => 'required|min:500|max:20000',
            'categories'   => ['required', new ValidCategoriesRule($categoryService)],
            'image'        => 'required|image|mimes:jpg,png,bmp|max:1999',
        ];
    }
}
