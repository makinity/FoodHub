import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState } from 'react';

interface Item { id: number; name: string; stock: number; is_available: boolean; price: number; category?: { name: string }; }
interface Props { items: Item[]; }

export default function Inventory({ items }: Props) {
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [stockValue, setStockValue] = useState(0);

    const startEdit = (item: Item) => { setEditingItem(item); setStockValue(item.stock); };

    const saveStock = () => {
        if (!editingItem) return;
        router.put(`/admin/inventory/${editingItem.id}`, { stock: stockValue }, { preserveScroll: true, onSuccess: () => setEditingItem(null) });
    };

    const toggleAvailability = (item: Item) => {
        router.put(`/admin/inventory/${item.id}`, { stock: item.stock, is_available: !item.is_available }, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Inventory - FoodHub Admin" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
                <p className="mt-1 text-sm text-gray-500">Manage stock and supplies</p>

                <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Item</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Stock</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Available</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No items</td></tr>
                            ) : items.map(item => (
                                <tr key={item.id} className={`border-b border-gray-100 dark:border-gray-700 ${item.stock <= 5 ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                                    <td className="px-4 py-3 font-medium dark:text-white">{item.name}</td>
                                    <td className="px-4 py-3">
                                        <span className={`font-medium ${item.stock <= 5 ? 'text-red-600' : 'dark:text-gray-300'}`}>{item.stock}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => toggleAvailability(item)} className={`rounded-full px-2 py-1 text-xs font-medium ${item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.is_available ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => startEdit(item)} className="text-xs text-blue-600 hover:underline">Edit Stock</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Stock Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
                    <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Stock</h2>
                        <p className="mt-1 text-sm text-gray-500">{editingItem.name}</p>
                        <div className="mt-4">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
                            <input type="number" value={stockValue} onChange={e => setStockValue(Number(e.target.value))} min={0} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button onClick={() => setEditingItem(null)} className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">Cancel</button>
                            <button onClick={saveStock} className="rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
