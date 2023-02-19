<?php

namespace App\Http\Requests\API\Admin;

use App\Rules\API\ValidCategoriesRule;
use App\Services\CategoryService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
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
            'title'        => [
                'required', 'min:5', 'max:190', Rule::unique('posts')->ignore($this->route('post')),
            ], //unique for slug
            'body'         => 'required|min:500|max:20000',
            'categories'   => ['required', new ValidCategoriesRule($categoryService)],
            'image'        => 'nullable|image|mimes:jpg,png,bmp|max:1999',
        ];
    }
}
