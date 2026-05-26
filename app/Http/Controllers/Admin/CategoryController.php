<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\SupabaseStorageService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Admin/Categories', [
            'categories' => Category::withCount('menuItems')->latest()->get(),
        ]);
    }

    public function store(Request $request, SupabaseStorageService $storage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $storage->upload($request->file('image'), 'categories');
        }

        Category::create($validated);

        return back()->with('success', 'Category created.');
    }

    public function update(Request $request, Category $category, SupabaseStorageService $storage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($category->getRawOriginal('image')) {
                $storage->delete($category->getRawOriginal('image'), 'categories');
            }
            $validated['image'] = $storage->upload($request->file('image'), 'categories');
        }

        $category->update($validated);

        return back()->with('success', 'Category updated.');
    }

    public function destroy(Category $category, SupabaseStorageService $storage)
    {
        if ($category->getRawOriginal('image')) {
            $storage->delete($category->getRawOriginal('image'), 'categories');
        }
        $category->delete();

        return back()->with('success', 'Category deleted.');
    }
}
