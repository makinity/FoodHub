<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IncomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::where('payment_status', 'paid');

        if ($request->from) {
            $query->whereDate('created_at', '>=', $request->from);
        }
        if ($request->to) {
            $query->whereDate('created_at', '<=', $request->to);
        }

        $totalIncome = (clone $query)->sum('total');
        $orderCount = (clone $query)->count();

        $dailyIncome = (clone $query)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total) as total'), DB::raw('COUNT(*) as orders'))
            ->groupBy('date')
            ->orderByDesc('date')
            ->limit(30)
            ->get();

        return inertia('Admin/Income', [
            'totalIncome' => $totalIncome,
            'orderCount' => $orderCount,
            'dailyIncome' => $dailyIncome,
            'filters' => $request->only('from', 'to'),
        ]);
    }
}
