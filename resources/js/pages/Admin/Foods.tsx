import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState, useRef, useMemo } from 'react';
import { useSnackbar } from '@/contexts/SnackbarContext';
import ConfirmModal from '@/components/ConfirmModal';

interface Category { id: number; name: string; }
interface Food { id: number; name: string; description: string; price: number; image_url: string; category_id: number; is_available: boolean; stock: number; category?: Category; }
interface Props { foods: Food[]; categories: Category[]; }

export default function Foods({ foods, categories }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModal, setViewModal] = useState<Food | null>(null);
    const [editing, setEditing] = useState<Food | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', category_id: '', is_available: true, stock: 0 });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const { showSnackbar } = useSnackbar();

    const filteredFoods = useMemo(() => {
        return foods.filter(f => {
            const matchesSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.description?.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = !filterCategory || String(f.category_id) === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [foods, search, filterCategory]);

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '', price: '', category_id: '', is_available: true, stock: 0 });
        setImageFile(null); setPreview(null); setModalOpen(true);
    };

    const openEdit = (food: Food) => {
        setEditing(food);
        setForm({ name: food.name, description: food.description || '', price: String(food.price), category_id: String(food.category_id), is_available: food.is_available, stock: food.stock });
        setImageFile(null);
        setPreview(food.image_url ? food.image_url : null);
        setModalOpen(true);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault(); setProcessing(true);
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category_id', form.category_id);
        formData.append('is_available', form.is_available ? '1' : '0');
        formData.append('stock', String(form.stock));
        if (imageFile) formData.append('image', imageFile);

        if (editing) {
            formData.append('_method', 'PUT');
            router.post(`/admin/foods/${editing.id}`, formData, { onSuccess: () => { setModalOpen(false); setProcessing(false); }, onError: () => setProcessing(false) });
        } else {
            router.post('/admin/foods', formData, { onSuccess: () => { setModalOpen(false); setProcessing(false); }, onError: () => setProcessing(false) });
        }
    };

    const deleteFood = (id: number) => {
        router.delete(`/admin/foods/${id}`, { preserveScroll: true });
        setConfirmDelete(null);
    };

    return (
        <AdminLayout>
            <Head title="Foods - FoodHub Admin" />
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Foods</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage your menu items</p>
                    </div>
                    <button onClick={openCreate} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">+ Add Food</button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search foods..." className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                    <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Image</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFoods.length === 0 ? (
                                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No food items found</td></tr>
                            ) : filteredFoods.map(food => (
                                <tr key={food.id} className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="px-4 py-3">
                                        <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                            {food.image_url ? (
                                                <img src={food.image_url} alt={food.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-sm">🍽️</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium dark:text-white">{food.name}</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${food.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {food.is_available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1">
                                            <button onClick={() => setViewModal(food)} title="View" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </button>
                                            <button onClick={() => openEdit(food)} title="Edit" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:hover:bg-gray-700">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => setConfirmDelete(food.id)} title="Delete" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {viewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewModal(null)} />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                        <div className="relative h-52 w-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-700 dark:to-gray-800">
                            {viewModal.image_url ? (
                                <img src={viewModal.image_url} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center"><span className="text-6xl opacity-50">🍽️</span></div>
                            )}
                            <button onClick={() => setViewModal(null)} className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{viewModal.name}</h2>
                                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">₱{Number(viewModal.price).toLocaleString()}</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{viewModal.description || 'No description'}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">{viewModal.category?.name || 'Uncategorized'}</span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">Stock: {viewModal.stock}</span>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${viewModal.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{viewModal.is_available ? 'Available' : 'Unavailable'}</span>
                            </div>
                            <div className="mt-5 flex gap-2">
                                <button onClick={() => { setViewModal(null); openEdit(viewModal); }} className="flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-medium text-white hover:bg-orange-600">Edit</button>
                                <button onClick={() => setViewModal(null)} className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{editing ? 'Edit Food' : 'Add Food'}</h2>
                            <p className="text-xs text-gray-500">Fill in the details for this menu item</p>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="group/upload relative h-44 w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-orange-400 hover:bg-orange-50/50 dark:border-gray-600 dark:bg-gray-900 dark:hover:border-orange-500"
                            >
                                {preview ? (
                                    <>
                                        <img src={preview} className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/upload:opacity-100">
                                            <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-2">
                                        <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
                                            <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload food image</p>
                                        <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                                    </div>
                                )}
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

                            {/* Name */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Classic Burger" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" required />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="A short description of the dish..." rows={2} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                            </div>

                            {/* Price & Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Price (₱)</label>
                                    <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" required />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                    <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" required>
                                        <option value="">Select...</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Stock & Availability */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                                    <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" min={0} />
                                </div>
                                <div className="flex items-end pb-1">
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <div className="relative">
                                            <input type="checkbox" checked={form.is_available} onChange={e => setForm({ ...form, is_available: e.target.checked })} className="peer sr-only" />
                                            <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-orange-500 dark:bg-gray-600"></div>
                                            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5"></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700">
                                <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">Cancel</button>
                                <button type="submit" disabled={processing} className="rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50">
                                    {processing ? 'Saving...' : editing ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ConfirmModal open={confirmDelete !== null} title="Delete Food" message="Are you sure you want to delete this food item?" onConfirm={() => deleteFood(confirmDelete!)} onCancel={() => setConfirmDelete(null)} />
        </AdminLayout>
    );
}
