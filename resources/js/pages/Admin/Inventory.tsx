import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState } from 'react';

interface Item { id: number; name: string; stock: number; is_available: boolean; price: number; category?: { name: string }; }
interface Props { items: Item[]; }

export default function Inventory({ items }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [stockValue, setStockValue] = useState(0);

    const startEdit = (item: Item) => { setEditingId(item.id); setStockValue(item.stock); };

    const saveStock = (id: number) => {
        router.put(`/admin/inventory/${id}`, { stock: stockValue }, { preserveScroll: true, onSuccess: () => setEditingId(null) });
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
                                <th className="px-4 py-3 font-medium text-gray-500">Category</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Price</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Stock</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Available</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No items</td></tr>
                            ) : items.map(item => (
                                <tr key={item.id} className={`border-b border-gray-100 dark:border-gray-700 ${item.stock <= 5 ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                                    <td className="px-4 py-3 font-medium dark:text-white">{item.name}</td>
                                    <td className="px-4 py-3 text-gray-500">{item.category?.name || '-'}</td>
                                    <td className="px-4 py-3 dark:text-gray-300">₱{Number(item.price).toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        {editingId === item.id ? (
                                            <input type="number" value={stockValue} onChange={e => setStockValue(Number(e.target.value))} className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" min={0} />
                                        ) : (
                                            <span className={`font-medium ${item.stock <= 5 ? 'text-red-600' : 'dark:text-gray-300'}`}>{item.stock}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => toggleAvailability(item)} className={`rounded-full px-2 py-1 text-xs font-medium ${item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.is_available ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        {editingId === item.id ? (
                                            <div className="flex gap-1">
                                                <button onClick={() => saveStock(item.id)} className="text-xs text-green-600 hover:underline">Save</button>
                                                <button onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:underline">Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => startEdit(item)} className="text-xs text-blue-600 hover:underline">Edit Stock</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
