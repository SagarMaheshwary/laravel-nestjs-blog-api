<?php

namespace App\Http\Requests\API\Admin\Category;

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
    public function rules()
    {
        return [
            'title'       => 'required|min:3|max:100|unique:categories',
            'description' => 'required|min:25|max:1000',
            'image'       => 'required|image|mimes:png,jpg,bmp|max:1999',
        ];
    }
}
