<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Http\Resources\FoodResource;

class FoodApiController extends Controller
{
    public function index()
    {
        return FoodResource::collection(MenuItem::where('is_available', true)->with('category')->get());
    }

    public function show(MenuItem $food)
    {
        return new FoodResource($food->load('category'));
    }
}
