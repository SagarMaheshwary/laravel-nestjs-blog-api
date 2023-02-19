<?php

namespace App\Rules\API;

use App\Services\CategoryService;
use Illuminate\Contracts\Validation\Rule;

class ValidCategoriesRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(private CategoryService $categoryService)
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->categoryService->findMany($value)->count() == count($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The specified category(s) are invalid.';
    }
}
