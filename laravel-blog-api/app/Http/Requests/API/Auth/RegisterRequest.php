<?php

namespace App\Http\Requests\API\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'name'  => 'required|min:2|max:50',
            'email' => 'required|email|min:5|max:255|unique:users',
            'password' => [
                'required',
                'max:255',
                Password::min(5)
                    ->numbers()
                    ->letters()
                    ->mixedCase(),
            ],
            'image' => 'required|image|mimes:jpg,png,bmp|max:1999',
        ];
    }
}
