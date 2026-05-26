<?php

use App\Http\Controllers\Web\PageController;
use Illuminate\Support\Facades\Route;

// Public pages
Route::get('/', [PageController::class, 'landing'])->name('landing');
Route::get('/menu', [PageController::class, 'menu'])->name('menu');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// Admin auth
Route::get('/admin/login', function () {
    return inertia('Auth/Login');
})->name('admin.login');

// Protected admin routes
Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('/foods', \App\Http\Controllers\Admin\FoodController::class)->names('admin.foods');
    Route::resource('/categories', \App\Http\Controllers\Admin\CategoryController::class)->names('admin.categories');
    Route::resource('/orders', \App\Http\Controllers\Admin\OrderController::class)->names('admin.orders');
    Route::resource('/customers', \App\Http\Controllers\Admin\CustomerController::class)->names('admin.customers');
    Route::get('/inventory', [\App\Http\Controllers\Admin\InventoryController::class, 'index'])->name('admin.inventory');
    Route::put('/inventory/{item}', [\App\Http\Controllers\Admin\InventoryController::class, 'update'])->name('admin.inventory.update');
    Route::get('/income', [\App\Http\Controllers\Admin\IncomeController::class, 'index'])->name('admin.income');
    Route::get('/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('admin.reports');
});

require __DIR__ . '/auth.php';
