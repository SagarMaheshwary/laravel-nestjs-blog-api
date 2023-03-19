<?php

namespace App\Extensions;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class FormRequest extends BaseFormRequest
{
    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            throw new ValidationException(
                $validator,
                jsonResponse([
                    'errors' => $validator->errors(),
                ], 'Validation Failed.', Response::HTTP_UNPROCESSABLE_ENTITY)
            );
        }

        return parent::failedValidation($validator);
    }
}
