<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => Order::count(),
                'menuItems' => MenuItem::count(),
                'categories' => Category::count(),
                'revenue' => Order::where('payment_status', 'paid')->sum('total'),
                'pendingOrders' => Order::where('status', 'pending')->count(),
                'customers' => Customer::count(),
            ],
            'recentOrders' => Order::with('customer')->latest()->limit(5)->get(),
        ]);
    }
}
