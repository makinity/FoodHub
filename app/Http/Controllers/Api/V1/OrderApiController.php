<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;

class OrderApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('items.menuItem');

        if ($request->customer_id) {
            $query->where('customer_id', $request->customer_id);
        }

        return OrderResource::collection($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string',
            'customer_phone' => 'nullable|string',
            'customer_address' => 'nullable|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // Find or create customer
        $customer = Customer::firstOrCreate(
            ['phone' => $validated['customer_phone']],
            ['name' => $validated['customer_name'], 'address' => $validated['customer_address']]
        );

        // Calculate total
        $total = 0;
        foreach ($validated['items'] as $item) {
            $menuItem = \App\Models\MenuItem::find($item['menu_item_id']);
            $total += $menuItem->price * $item['quantity'];
        }

        $order = Order::create([
            'customer_id' => $customer->id,
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'customer_address' => $validated['customer_address'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'total' => $total,
        ]);

        foreach ($validated['items'] as $item) {
            $menuItem = \App\Models\MenuItem::find($item['menu_item_id']);
            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'price' => $menuItem->price,
            ]);
        }

        return new OrderResource($order->load('items.menuItem'));
    }

    public function show(Order $order)
    {
        return new OrderResource($order->load('items.menuItem'));
    }
}
