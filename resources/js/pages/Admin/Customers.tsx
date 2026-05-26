import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState, useMemo } from 'react';

interface Customer { id: number; name: string; phone: string; email: string; address: string; orders_count: number; orders_sum_total: number; created_at: string; }
interface Props { customers: Customer[]; }

export default function Customers({ customers }: Props) {
    const [search, setSearch] = useState('');

    const filteredCustomers = useMemo(() => {
        if (!search) return customers;
        const q = search.toLowerCase();
        return customers.filter(c => c.name?.toLowerCase().includes(q) || c.phone?.includes(q) || c.email?.toLowerCase().includes(q));
    }, [customers, search]);

    return (
        <AdminLayout>
            <Head title="Customers - FoodHub Admin" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
                <p className="mt-1 text-sm text-gray-500">View customer information</p>

                <div className="mt-4">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or email..." className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Phone</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Email</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Orders</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Total Spent</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length === 0 ? (
                                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No customers found</td></tr>
                            ) : filteredCustomers.map(c => (
                                <tr key={c.id} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="px-4 py-3 font-medium dark:text-white">{c.name}</td>
                                    <td className="px-4 py-3 text-gray-500">{c.phone || '-'}</td>
                                    <td className="px-4 py-3 text-gray-500">{c.email || '-'}</td>
                                    <td className="px-4 py-3 dark:text-gray-300">{c.orders_count}</td>
                                    <td className="px-4 py-3 font-medium text-green-600">₱{Number(c.orders_sum_total || 0).toLocaleString()}</td>
                                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
