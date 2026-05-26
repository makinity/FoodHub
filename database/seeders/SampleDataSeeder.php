<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // Categories
        $categories = [
            ['name' => 'Burgers'],
            ['name' => 'Pizza'],
            ['name' => 'Drinks'],
            ['name' => 'Desserts'],
            ['name' => 'Rice Meals'],
            ['name' => 'Pasta'],
        ];
        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Foods
        $foods = [
            ['name' => 'Classic Burger', 'description' => 'Juicy beef patty with lettuce and tomato', 'price' => 149, 'category_id' => 1, 'is_available' => true, 'stock' => 50],
            ['name' => 'Cheese Burger', 'description' => 'Double cheese with special sauce', 'price' => 179, 'category_id' => 1, 'is_available' => true, 'stock' => 35],
            ['name' => 'Bacon Burger', 'description' => 'Crispy bacon with caramelized onions', 'price' => 199, 'category_id' => 1, 'is_available' => true, 'stock' => 20],
            ['name' => 'Margherita Pizza', 'description' => 'Fresh mozzarella, basil, and tomato sauce', 'price' => 299, 'category_id' => 2, 'is_available' => true, 'stock' => 15],
            ['name' => 'Pepperoni Pizza', 'description' => 'Loaded with pepperoni and cheese', 'price' => 349, 'category_id' => 2, 'is_available' => true, 'stock' => 12],
            ['name' => 'Hawaiian Pizza', 'description' => 'Ham and pineapple on cheesy base', 'price' => 329, 'category_id' => 2, 'is_available' => false, 'stock' => 0],
            ['name' => 'Iced Coffee', 'description' => 'Cold brew with milk', 'price' => 89, 'category_id' => 3, 'is_available' => true, 'stock' => 100],
            ['name' => 'Mango Shake', 'description' => 'Fresh mango blended with ice', 'price' => 99, 'category_id' => 3, 'is_available' => true, 'stock' => 60],
            ['name' => 'Coke Float', 'description' => 'Coca-cola with vanilla ice cream', 'price' => 79, 'category_id' => 3, 'is_available' => true, 'stock' => 45],
            ['name' => 'Chocolate Cake', 'description' => 'Rich dark chocolate layered cake', 'price' => 159, 'category_id' => 4, 'is_available' => true, 'stock' => 10],
            ['name' => 'Leche Flan', 'description' => 'Creamy caramel custard', 'price' => 89, 'category_id' => 4, 'is_available' => true, 'stock' => 25],
            ['name' => 'Chicken Adobo', 'description' => 'Filipino style braised chicken with rice', 'price' => 169, 'category_id' => 5, 'is_available' => true, 'stock' => 30],
            ['name' => 'Pork Sisig', 'description' => 'Sizzling chopped pork with egg', 'price' => 189, 'category_id' => 5, 'is_available' => true, 'stock' => 22],
            ['name' => 'Beef Tapa', 'description' => 'Cured beef with garlic rice and egg', 'price' => 179, 'category_id' => 5, 'is_available' => true, 'stock' => 18],
            ['name' => 'Carbonara', 'description' => 'Creamy pasta with bacon bits', 'price' => 199, 'category_id' => 6, 'is_available' => true, 'stock' => 20],
            ['name' => 'Spaghetti Bolognese', 'description' => 'Meaty tomato sauce pasta', 'price' => 179, 'category_id' => 6, 'is_available' => true, 'stock' => 25],
        ];
        foreach ($foods as $food) {
            MenuItem::create($food);
        }

        // Customers
        $customers = [
            ['name' => 'Juan Dela Cruz', 'phone' => '09171234567', 'email' => 'juan@email.com', 'address' => '123 Rizal St, Manila'],
            ['name' => 'Maria Santos', 'phone' => '09181234567', 'email' => 'maria@email.com', 'address' => '456 Mabini Ave, Quezon City'],
            ['name' => 'Pedro Reyes', 'phone' => '09191234567', 'email' => 'pedro@email.com', 'address' => '789 Bonifacio Blvd, Makati'],
            ['name' => 'Ana Garcia', 'phone' => '09201234567', 'email' => 'ana@email.com', 'address' => '321 Luna St, Pasig'],
            ['name' => 'Carlos Mendoza', 'phone' => '09211234567', 'email' => 'carlos@email.com', 'address' => '654 Del Pilar Rd, Taguig'],
            ['name' => 'Sofia Villanueva', 'phone' => '09221234567', 'email' => 'sofia@email.com', 'address' => '987 Aguinaldo St, Paranaque'],
            ['name' => 'Miguel Torres', 'phone' => '09231234567', 'email' => 'miguel@email.com', 'address' => '147 Quezon Ave, Caloocan'],
            ['name' => 'Isabella Cruz', 'phone' => '09241234567', 'email' => 'isabella@email.com', 'address' => '258 Roxas Blvd, Pasay'],
        ];
        foreach ($customers as $cust) {
            Customer::create($cust);
        }

        // Orders
        $statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'delivered', 'delivered', 'delivered'];
        $paymentStatuses = ['unpaid', 'unpaid', 'unpaid', 'paid', 'paid', 'paid', 'paid', 'paid'];

        for ($i = 0; $i < 20; $i++) {
            $customerId = rand(1, 8);
            $customer = Customer::find($customerId);
            $statusIdx = $i < 8 ? $i : rand(4, 7);

            $order = Order::create([
                'customer_id' => $customerId,
                'customer_name' => $customer->name,
                'customer_phone' => $customer->phone,
                'customer_address' => $customer->address,
                'status' => $statuses[$statusIdx] ?? 'delivered',
                'payment_status' => $paymentStatuses[$statusIdx] ?? 'paid',
                'total' => 0,
                'notes' => $i % 3 === 0 ? 'Extra rice please' : null,
                'created_at' => now()->subDays(rand(0, 14))->subHours(rand(0, 12)),
            ]);

            // Add 1-4 items per order
            $itemCount = rand(1, 4);
            $total = 0;
            $usedItems = [];
            for ($j = 0; $j < $itemCount; $j++) {
                $menuItemId = rand(1, 16);
                if (in_array($menuItemId, $usedItems)) continue;
                $usedItems[] = $menuItemId;
                $menuItem = MenuItem::find($menuItemId);
                $qty = rand(1, 3);
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $menuItemId,
                    'quantity' => $qty,
                    'price' => $menuItem->price,
                ]);
                $total += $menuItem->price * $qty;
            }

            $order->update(['total' => $total]);
        }
    }
}
