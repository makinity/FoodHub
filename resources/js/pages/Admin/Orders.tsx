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
    const [viewOrder, setViewOrder] = useState<Order | null>(null);

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
                                <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No orders found</td></tr>
                            ) : filteredOrders.map(order => (
                                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="px-4 py-3 font-medium dark:text-white">#{order.id}</td>
                                    <td className="px-4 py-3 dark:text-gray-300">
                                        <div>{order.customer_name}</div>
                                        <div className="text-xs text-gray-400">{order.customer_phone}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => setViewOrder(order)} title="View Details" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Order Modal */}
            {viewOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewOrder(null)} />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                        <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order #{viewOrder.id}</h2>
                                <button onClick={() => setViewOrder(null)} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Customer</p>
                                <p className="text-sm dark:text-white">{viewOrder.customer_name}</p>
                                <p className="text-xs text-gray-400">{viewOrder.customer_phone}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Items</p>
                                <ul className="mt-1 space-y-1">
                                    {viewOrder.items.map(i => (
                                        <li key={i.id} className="flex justify-between text-sm dark:text-gray-300">
                                            <span>{i.menu_item?.name} x{i.quantity}</span>
                                            <span>₱{Number(i.price * i.quantity).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-between border-t pt-3 dark:border-gray-700">
                                <span className="text-sm font-medium text-gray-500">Total</span>
                                <span className="font-semibold text-orange-600">₱{Number(viewOrder.total).toLocaleString()}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColor[viewOrder.status] || ''}`}>{viewOrder.status}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Payment</p>
                                    <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${viewOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{viewOrder.payment_status}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                    <p className="mt-1 text-xs dark:text-gray-300">{new Date(viewOrder.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {viewOrder.notes && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Notes</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{viewOrder.notes}</p>
                                </div>
                            )}
                            <button onClick={() => setViewOrder(null)} className="w-full rounded-xl border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
