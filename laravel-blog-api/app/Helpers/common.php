<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

if (!function_exists('jsonResponse')) {
    function jsonResponse(
        array $data,
        string $message = null,
        int $status = Response::HTTP_OK,
        array $headers = []
    ): JsonResponse {
        return response()->json([
            'data'    => $data,
            'message' => $message,
        ], $status, $headers);
    }
}

if (!function_exists('perPage')) {
    function perPage(): int
    {
        return request('per-page', config('common.pagination.per_page'));
    }
}
