import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

interface Stats {
    totalOrders: number;
    menuItems: number;
    categories: number;
    revenue: number;
    pendingOrders: number;
    customers: number;
}

interface RecentOrder {
    id: number;
    customer_name: string;
    total: number;
    status: string;
    payment_status: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentOrders: RecentOrder[];
}

export default function Dashboard({ stats, recentOrders }: Props) {
    const statusColor: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        preparing: 'bg-purple-100 text-purple-800',
        ready: 'bg-green-100 text-green-800',
        delivered: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <AdminLayout>
            <Head title="Dashboard - FoodHub Admin" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Overview of your restaurant</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="mt-1 text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Menu Items</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.menuItems}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Categories</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.categories}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Customers</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.customers}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="mt-1 text-2xl font-bold text-green-600">₱{Number(stats.revenue).toLocaleString()}</p>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="mt-8">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                    <div className="overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-4 py-3 font-medium text-gray-500">ID</th>
                                    <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
                                    <th className="px-4 py-3 font-medium text-gray-500">Total</th>
                                    <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                    <th className="px-4 py-3 font-medium text-gray-500">Payment</th>
                                    <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length === 0 ? (
                                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No orders yet</td></tr>
                                ) : recentOrders.map(order => (
                                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                                        <td className="px-4 py-3 font-medium dark:text-white">#{order.id}</td>
                                        <td className="px-4 py-3 dark:text-gray-300">{order.customer_name}</td>
                                        <td className="px-4 py-3 dark:text-gray-300">₱{Number(order.total).toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor[order.status] || ''}`}>{order.status}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.payment_status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
