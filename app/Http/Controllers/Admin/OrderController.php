<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['items.menuItem', 'customer'])->latest();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return inertia('Admin/Orders', [
            'orders' => $query->get(),
            'filters' => $request->only('status'),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,preparing,ready,delivered,cancelled',
            'payment_status' => 'sometimes|in:paid,unpaid',
        ]);

        $order->update($validated);

        return back()->with('success', 'Order updated.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return back()->with('success', 'Order deleted.');
    }
}
