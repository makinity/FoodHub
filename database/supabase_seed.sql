-- FoodHub Supabase Seed Data
-- Run this AFTER supabase_schema.sql

-- ============================================
-- CATEGORIES
-- ============================================

insert into public.categories (name) values
    ('Burgers'),
    ('Pizza'),
    ('Drinks'),
    ('Desserts'),
    ('Rice Meals'),
    ('Pasta');

-- ============================================
-- MENU ITEMS
-- ============================================

insert into public.menu_items (name, description, price, category_id, is_available, stock) values
    ('Classic Burger', 'Juicy beef patty with lettuce and tomato', 149, 1, true, 50),
    ('Cheese Burger', 'Double cheese with special sauce', 179, 1, true, 35),
    ('Bacon Burger', 'Crispy bacon with caramelized onions', 199, 1, true, 20),
    ('Margherita Pizza', 'Fresh mozzarella, basil, and tomato sauce', 299, 2, true, 15),
    ('Pepperoni Pizza', 'Loaded with pepperoni and cheese', 349, 2, true, 12),
    ('Hawaiian Pizza', 'Ham and pineapple on cheesy base', 329, 2, false, 0),
    ('Iced Coffee', 'Cold brew with milk', 89, 3, true, 100),
    ('Mango Shake', 'Fresh mango blended with ice', 99, 3, true, 60),
    ('Coke Float', 'Coca-cola with vanilla ice cream', 79, 3, true, 45),
    ('Chocolate Cake', 'Rich dark chocolate layered cake', 159, 4, true, 10),
    ('Leche Flan', 'Creamy caramel custard', 89, 4, true, 25),
    ('Chicken Adobo', 'Filipino style braised chicken with rice', 169, 5, true, 30),
    ('Pork Sisig', 'Sizzling chopped pork with egg', 189, 5, true, 22),
    ('Beef Tapa', 'Cured beef with garlic rice and egg', 179, 5, true, 18),
    ('Carbonara', 'Creamy pasta with bacon bits', 199, 6, true, 20),
    ('Spaghetti Bolognese', 'Meaty tomato sauce pasta', 179, 6, true, 25);

-- ============================================
-- CUSTOMERS
-- ============================================

insert into public.customers (name, phone, email, address) values
    ('Juan Dela Cruz', '09171234567', 'juan@email.com', '123 Rizal St, Manila'),
    ('Maria Santos', '09181234567', 'maria@email.com', '456 Mabini Ave, Quezon City'),
    ('Pedro Reyes', '09191234567', 'pedro@email.com', '789 Bonifacio Blvd, Makati'),
    ('Ana Garcia', '09201234567', 'ana@email.com', '321 Luna St, Pasig'),
    ('Carlos Mendoza', '09211234567', 'carlos@email.com', '654 Del Pilar Rd, Taguig'),
    ('Sofia Villanueva', '09221234567', 'sofia@email.com', '987 Aguinaldo St, Paranaque'),
    ('Miguel Torres', '09231234567', 'miguel@email.com', '147 Quezon Ave, Caloocan'),
    ('Isabella Cruz', '09241234567', 'isabella@email.com', '258 Roxas Blvd, Pasay');

-- ============================================
-- ORDERS
-- ============================================

insert into public.orders (customer_id, customer_name, customer_phone, customer_address, status, payment_status, total, notes, created_at) values
    (1, 'Juan Dela Cruz', '09171234567', '123 Rizal St, Manila', 'pending', 'unpaid', 527, 'Extra rice please', now() - interval '14 days'),
    (3, 'Pedro Reyes', '09191234567', '789 Bonifacio Blvd, Makati', 'confirmed', 'unpaid', 348, null, now() - interval '12 days'),
    (5, 'Carlos Mendoza', '09211234567', '654 Del Pilar Rd, Taguig', 'preparing', 'unpaid', 478, null, now() - interval '10 days'),
    (2, 'Maria Santos', '09181234567', '456 Mabini Ave, Quezon City', 'ready', 'paid', 647, 'Extra rice please', now() - interval '9 days'),
    (4, 'Ana Garcia', '09201234567', '321 Luna St, Pasig', 'delivered', 'paid', 268, null, now() - interval '7 days'),
    (6, 'Sofia Villanueva', '09221234567', '987 Aguinaldo St, Paranaque', 'delivered', 'paid', 537, null, now() - interval '6 days'),
    (7, 'Miguel Torres', '09231234567', '147 Quezon Ave, Caloocan', 'delivered', 'paid', 398, 'Extra rice please', now() - interval '5 days'),
    (8, 'Isabella Cruz', '09241234567', '258 Roxas Blvd, Pasay', 'delivered', 'paid', 716, null, now() - interval '4 days'),
    (1, 'Juan Dela Cruz', '09171234567', '123 Rizal St, Manila', 'delivered', 'paid', 328, null, now() - interval '3 days'),
    (2, 'Maria Santos', '09181234567', '456 Mabini Ave, Quezon City', 'delivered', 'paid', 458, 'Extra rice please', now() - interval '2 days'),
    (5, 'Carlos Mendoza', '09211234567', '654 Del Pilar Rd, Taguig', 'delivered', 'paid', 179, null, now() - interval '1 day'),
    (3, 'Pedro Reyes', '09191234567', '789 Bonifacio Blvd, Makati', 'delivered', 'paid', 547, null, now() - interval '13 days');

-- ============================================
-- ORDER ITEMS
-- ============================================

insert into public.order_items (order_id, menu_item_id, quantity, price) values
    -- Order 1
    (1, 1, 2, 149),
    (1, 7, 1, 89),
    (1, 10, 1, 159),
    -- Order 2
    (2, 4, 1, 299),
    (2, 8, 1, 99),
    -- Order 3
    (3, 12, 2, 169),
    (3, 15, 1, 199),
    -- Order 4
    (4, 5, 1, 349),
    (4, 2, 1, 179),
    (4, 9, 1, 79),
    -- Order 5
    (5, 3, 1, 199),
    (5, 11, 1, 89),
    -- Order 6
    (6, 13, 2, 189),
    (6, 7, 1, 89),
    (6, 10, 1, 159),
    -- Order 7
    (7, 15, 2, 199),
    -- Order 8
    (8, 5, 1, 349),
    (8, 14, 1, 179),
    (8, 8, 2, 99),
    -- Order 9
    (9, 1, 1, 149),
    (9, 2, 1, 179),
    -- Order 10
    (10, 12, 1, 169),
    (10, 16, 1, 179),
    (10, 7, 1, 89),
    -- Order 11
    (11, 16, 1, 179),
    -- Order 12
    (12, 4, 1, 299),
    (12, 3, 1, 199);
