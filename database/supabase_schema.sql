-- FoodHub Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables

-- Enable UUID extension (already enabled by default in Supabase)
-- create extension if not exists "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

create type user_role as enum ('admin', 'customer');
create type order_status as enum ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');
create type payment_status as enum ('unpaid', 'paid');

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================

create table public.users (
    id uuid references auth.users(id) on delete cascade primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    role user_role not null default 'customer',
    email_verified_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- CATEGORIES TABLE
-- ============================================

create table public.categories (
    id bigint generated always as identity primary key,
    name varchar(255) not null,
    icon varchar(255),
    image varchar(255),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- MENU ITEMS TABLE
-- ============================================

create table public.menu_items (
    id bigint generated always as identity primary key,
    name varchar(255) not null,
    description text,
    price decimal(8, 2) not null,
    image_url varchar(255),
    category_id bigint not null references public.categories(id) on delete cascade,
    is_available boolean default true,
    stock integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- CUSTOMERS TABLE
-- ============================================

create table public.customers (
    id bigint generated always as identity primary key,
    name varchar(255) not null,
    phone varchar(255),
    email varchar(255),
    address text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- ORDERS TABLE
-- ============================================

create table public.orders (
    id bigint generated always as identity primary key,
    customer_id bigint references public.customers(id) on delete set null,
    customer_name varchar(255) not null,
    customer_phone varchar(255),
    customer_address varchar(255),
    status order_status default 'pending',
    payment_status payment_status default 'unpaid',
    total decimal(10, 2) not null,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================

create table public.order_items (
    id bigint generated always as identity primary key,
    order_id bigint not null references public.orders(id) on delete cascade,
    menu_item_id bigint not null references public.menu_items(id) on delete cascade,
    quantity integer not null,
    price decimal(8, 2) not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================

create index idx_menu_items_category on public.menu_items(category_id);
create index idx_orders_customer on public.orders(customer_id);
create index idx_orders_status on public.orders(status);
create index idx_order_items_order on public.order_items(order_id);
create index idx_order_items_menu_item on public.order_items(menu_item_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
    on public.users for select
    using (auth.uid() = id);

-- Admins can view all users
create policy "Admins can view all users"
    on public.users for select
    using (
        exists (select 1 from public.users where id = auth.uid() and role = 'admin')
    );

-- Categories are publicly readable
create policy "Categories are viewable by everyone"
    on public.categories for select
    using (true);

-- Only admins can manage categories
create policy "Admins can manage categories"
    on public.categories for all
    using (
        exists (select 1 from public.users where id = auth.uid() and role = 'admin')
    );

-- Menu items are publicly readable
create policy "Menu items are viewable by everyone"
    on public.menu_items for select
    using (true);

-- Only admins can manage menu items
create policy "Admins can manage menu items"
    on public.menu_items for all
    using (
        exists (select 1 from public.users where id = auth.uid() and role = 'admin')
    );

-- Only admins can manage customers
create policy "Admins can manage customers"
    on public.customers for all
    using (
        exists (select 1 from public.users where id = auth.uid() and role = 'admin')
    );

-- Only admins can manage orders
create policy "Admins can manage orders"
    on public.orders for all
    using (
        exists (select 1 from public.users where id = auth.uid() and role = 'admin')
    );

-- Only admins can manage order items
create policy "Admins can manage order items"
    on public.order_items for all
    using (
        exists (select 1 from public.users where id = auth.uid() and role = 'admin')
    );

-- ============================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger set_updated_at before update on public.users
    for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.categories
    for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.menu_items
    for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.customers
    for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.orders
    for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.order_items
    for each row execute function public.handle_updated_at();

-- ============================================
-- FUNCTION: Handle new user signup
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, name, email, role)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'name', new.email),
        new.email,
        coalesce((new.raw_user_meta_data->>'role')::user_role, 'customer')
    );
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create user profile on signup
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
