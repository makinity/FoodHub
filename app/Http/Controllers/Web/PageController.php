<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;

class PageController extends Controller
{
    public function landing()
    {
        return inertia('Public/Landing');
    }

    public function menu()
    {
        return inertia('Public/Menu', [
            'foods' => MenuItem::latest()->get(),
            'categories' => Category::all(),
        ]);
    }

    public function about()
    {
        return inertia('Public/About');
    }

    public function contact()
    {
        return inertia('Public/Contact');
    }
}
