<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        return inertia('Admin/Inventory', [
            'items' => MenuItem::with('category')->orderBy('stock')->get(),
        ]);
    }

    public function update(Request $request, MenuItem $item)
    {
        $validated = $request->validate([
            'stock' => 'required|integer|min:0',
            'is_available' => 'sometimes|boolean',
        ]);

        $item->update($validated);

        return back()->with('success', 'Stock updated.');
    }
}
