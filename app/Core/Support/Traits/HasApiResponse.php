<?php

namespace App\Core\Support\Traits;

use Illuminate\Http\JsonResponse;

trait HasApiResponse
{
    public function successResponse(string $message, array $data = []): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data,
        ]);
    }

    public function errorResponse(string $message, int $code = 400): JsonResponse
    {
        return response()->json([
            'status'  => 'error',
            'message' => $message,
        ], $code);
    }
}