import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState, useMemo } from 'react';

interface OrderItem { id: number; quantity: number; price: number; menu_item?: { name: string }; }
interface Order { id: number; customer_name: string; customer_phone: string; total: number; status: string; payment_status: string; notes: string; created_at: string; items: OrderItem[]; }
interface Props { orders: Order[]; filters: { status?: string }; }

const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800', ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800', cancelled: 'bg-red-100 text-red-800',
};

export default function Orders({ orders, filters }: Props) {
    const [search, setSearch] = useState('');

    const filteredOrders = useMemo(() => {
        if (!search) return orders;
        const q = search.toLowerCase();
        return orders.filter(o => o.customer_name?.toLowerCase().includes(q) || o.customer_phone?.includes(q) || String(o.id).includes(q));
    }, [orders, search]);

    const updateStatus = (id: number, status: string) => {
        router.put(`/admin/orders/${id}`, { status }, { preserveScroll: true });
    };

    const updatePayment = (id: number, payment_status: string) => {
        router.put(`/admin/orders/${id}`, { payment_status }, { preserveScroll: true });
    };

    const filterByStatus = (status: string) => {
        router.get('/admin/orders', status ? { status } : {}, { preserveState: true });
    };

    return (
        <AdminLayout>
            <Head title="Orders - FoodHub Admin" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
                <p className="mt-1 text-sm text-gray-500">Manage customer orders</p>

                {/* Filters */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer or order #..." className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                    <button onClick={() => filterByStatus('')} className={`rounded-full px-3 py-1 text-xs font-medium ${!filters.status ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>All</button>
                    {statuses.map(s => (
                        <button key={s} onClick={() => filterByStatus(s)} className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${filters.status === s ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>{s}</button>
                    ))}
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">ID</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Items</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Total</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Payment</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No orders found</td></tr>
                            ) : filteredOrders.map(order => (
                                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="px-4 py-3 font-medium dark:text-white">#{order.id}</td>
                                    <td className="px-4 py-3 dark:text-gray-300">
                                        <div>{order.customer_name}</div>
                                        <div className="text-xs text-gray-400">{order.customer_phone}</div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">{order.items.map(i => `${i.menu_item?.name} x${i.quantity}`).join(', ') || '-'}</td>
                                    <td className="px-4 py-3 font-medium dark:text-gray-300">₱{Number(order.total).toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-4 py-3">
                                        <select value={order.payment_status} onChange={e => updatePayment(order.id, e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                            <option value="unpaid">unpaid</option>
                                            <option value="paid">paid</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
