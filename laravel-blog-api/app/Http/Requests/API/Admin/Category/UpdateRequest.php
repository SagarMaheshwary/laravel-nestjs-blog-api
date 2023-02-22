<?php

namespace App\Http\Requests\API\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
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
            'title'       => [
                'required', 'min:3', 'max:100', Rule::unique('categories')->ignore($this->route('category')),
            ],
            'description' => 'required|min:25|max:1000',
            'image'       => 'nullable|image|mimes:png,jpg,bmp|max:1999',
        ];
    }
}
