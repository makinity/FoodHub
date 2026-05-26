<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Category;
use App\Services\SupabaseStorageService;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index()
    {
        return inertia('Admin/Foods', [
            'foods' => MenuItem::with('category')->latest()->get(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request, SupabaseStorageService $storage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'is_available' => 'boolean',
            'stock' => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = $storage->upload($request->file('image'), 'foods');
        }
        unset($validated['image']);

        MenuItem::create($validated);

        return back()->with('success', 'Food item created.');
    }

    public function update(Request $request, MenuItem $food, SupabaseStorageService $storage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'is_available' => 'boolean',
            'stock' => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            if ($food->getRawOriginal('image_url')) {
                $storage->delete($food->getRawOriginal('image_url'), 'foods');
            }
            $validated['image_url'] = $storage->upload($request->file('image'), 'foods');
        }
        unset($validated['image']);

        $food->update($validated);

        return back()->with('success', 'Food item updated.');
    }

    public function destroy(MenuItem $food, SupabaseStorageService $storage)
    {
        if ($food->getRawOriginal('image_url')) {
            $storage->delete($food->getRawOriginal('image_url'), 'foods');
        }
        $food->delete();

        return back()->with('success', 'Food item deleted.');
    }
}
