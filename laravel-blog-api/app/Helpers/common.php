<?php

use Illuminate\Http\Response;

if (!function_exists('jsonResponse')) {
    function jsonResponse(
        array $data,
        string $message = null,
        int $status = Response::HTTP_OK,
        array $headers = []
    ) {
        return response()->json([
            'data'    => $data,
            'message' => $message,
        ], $status, $headers);
    }
}
