<?php

use App\Http\Controllers\Api\V1\FoodApiController;
use App\Http\Controllers\Api\V1\CategoryApiController;
use App\Http\Controllers\Api\V1\OrderApiController;
use Illuminate\Support\Facades\Route;

// API V1 Routes (for FlutterFlow)
Route::prefix('v1')->middleware('api')->group(function () {
    Route::get('menu', [FoodApiController::class, 'index']);
    Route::apiResource('foods', FoodApiController::class);
    Route::apiResource('categories', CategoryApiController::class);
    Route::apiResource('orders', OrderApiController::class);
});
