import { Link, usePage, router } from '@inertiajs/react';
import { useState, ReactNode } from 'react';
import { SnackbarProvider } from '@/contexts/SnackbarContext';

interface AdminLayoutProps {
    children: ReactNode;
}

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Foods', href: '/admin/foods', icon: '🍔' },
    { name: 'Categories', href: '/admin/categories', icon: '📁' },
    { name: 'Orders', href: '/admin/orders', icon: '📦' },
    { name: 'Income', href: '/admin/income', icon: '💰' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Inventory', href: '/admin/inventory', icon: '📋' },
    { name: 'Reports', href: '/admin/reports', icon: '📈' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { auth } = usePage().props as any;
    const currentUrl = usePage().url;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <SnackbarProvider>
            <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
                {/* Sidebar overlay (mobile) */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform dark:bg-gray-800 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    {/* Logo */}
                    <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6 dark:border-gray-700">
                        <span className="text-2xl">🍕</span>
                        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">FoodHub</span>
                        <span className="ml-1 rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">Admin</span>
                    </div>

                    {/* Nav */}
                    <nav className="mt-4 space-y-1 px-3">
                        {navItems.map((item) => {
                            const isActive = currentUrl.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout at bottom */}
                    <div className="absolute bottom-0 w-full border-t border-gray-200 p-4 dark:border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                            <span>🚪</span>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Navbar */}
                    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                        {/* Mobile menu button */}
                        <button onClick={() => setSidebarOpen(true)} className="text-xl lg:hidden">☰</button>

                        <div className="hidden lg:block">
                            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Welcome back,</h2>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                                    {auth?.user?.name?.charAt(0) || 'A'}
                                </div>
                                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:block">
                                    {auth?.user?.name || 'Admin'}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SnackbarProvider>
    );
}
