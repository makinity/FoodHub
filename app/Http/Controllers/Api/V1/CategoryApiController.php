<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Resources\CategoryResource;

class CategoryApiController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::withCount('menuItems')->get());
    }

    public function show(Category $category)
    {
        return new CategoryResource($category->loadCount('menuItems'));
    }
}
