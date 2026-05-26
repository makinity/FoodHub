import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState } from 'react';

interface DailyIncome { date: string; total: number; orders: number; }
interface Props { totalIncome: number; orderCount: number; dailyIncome: DailyIncome[]; filters: { from?: string; to?: string }; }

export default function Income({ totalIncome, orderCount, dailyIncome, filters }: Props) {
    const [from, setFrom] = useState(filters.from || '');
    const [to, setTo] = useState(filters.to || '');

    const applyFilter = () => {
        router.get('/admin/income', { from, to }, { preserveState: true });
    };

    return (
        <AdminLayout>
            <Head title="Income - FoodHub Admin" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Income</h1>
                <p className="mt-1 text-sm text-gray-500">Track your revenue and earnings</p>

                {/* Summary Cards */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Total Income (Paid Orders)</p>
                        <p className="mt-1 text-3xl font-bold text-green-600">₱{Number(totalIncome).toLocaleString()}</p>
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Paid Orders</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{orderCount}</p>
                    </div>
                </div>

                {/* Date Filter */}
                <div className="mt-6 flex flex-wrap items-end gap-3">
                    <div>
                        <label className="mb-1 block text-xs text-gray-500">From</label>
                        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs text-gray-500">To</label>
                        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                    </div>
                    <button onClick={applyFilter} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">Filter</button>
                </div>

                {/* Daily Breakdown */}
                <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Orders</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyIncome.length === 0 ? (
                                <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">No income data</td></tr>
                            ) : dailyIncome.map(day => (
                                <tr key={day.date} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="px-4 py-3 dark:text-gray-300">{day.date}</td>
                                    <td className="px-4 py-3 dark:text-gray-300">{day.orders}</td>
                                    <td className="px-4 py-3 font-medium text-green-600">₱{Number(day.total).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
