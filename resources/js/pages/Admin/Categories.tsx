import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState, useRef, useMemo } from 'react';
import { useSnackbar } from '@/contexts/SnackbarContext';
import ConfirmModal from '@/components/ConfirmModal';

interface Category { id: number; name: string; image: string; menu_items_count: number; }
interface Props { categories: Category[]; }

export default function Categories({ categories }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModal, setViewModal] = useState<Category | null>(null);
    const [editing, setEditing] = useState<Category | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState('');
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const { showSnackbar } = useSnackbar();

    const filteredCategories = useMemo(() => {
        if (!search) return categories;
        return categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }, [categories, search]);

    const openCreate = () => { setEditing(null); setName(''); setImageFile(null); setPreview(null); setModalOpen(true); };
    const openEdit = (cat: Category) => {
        setEditing(cat); setName(cat.name); setImageFile(null);
        setPreview(cat.image ? cat.image : null); setModalOpen(true);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault(); setProcessing(true);
        const formData = new FormData();
        formData.append('name', name);
        if (imageFile) formData.append('image', imageFile);
        if (editing) {
            formData.append('_method', 'PUT');
            router.post(`/admin/categories/${editing.id}`, formData, { onSuccess: () => { setModalOpen(false); setProcessing(false); }, onError: () => setProcessing(false) });
        } else {
            router.post('/admin/categories', formData, { onSuccess: () => { setModalOpen(false); setProcessing(false); }, onError: () => setProcessing(false) });
        }
    };

    const deleteCategory = (id: number) => {
        router.delete(`/admin/categories/${id}`, { preserveScroll: true });
        setConfirmDelete(null);
    };

    return (
        <AdminLayout>
            <Head title="Categories - FoodHub Admin" />
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage food categories</p>
                    </div>
                    <button onClick={openCreate} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">+ Add Category</button>
                </div>

                <div className="mt-4">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search categories..." className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                </div>

                {/* Category Cards */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCategories.length === 0 ? (
                        <p className="col-span-full py-12 text-center text-gray-400">No categories found</p>
                    ) : filteredCategories.map(cat => (
                        <div key={cat.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
                            <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-700 dark:to-gray-800">
                                {cat.image ? (
                                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center"><span className="text-5xl opacity-50">🍽️</span></div>
                                )}
                                <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                                    {cat.menu_items_count} {cat.menu_items_count === 1 ? 'item' : 'items'}
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                                <div className="flex gap-1">
                                    <button onClick={() => setViewModal(cat)} title="View" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </button>
                                    <button onClick={() => openEdit(cat)} title="Edit" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:hover:bg-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button onClick={() => setConfirmDelete(cat.id)} title="Delete" className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* View Modal */}
            {viewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewModal(null)} />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                        <div className="relative h-52 w-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-700 dark:to-gray-800">
                            {viewModal.image ? (
                                <img src={viewModal.image} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center"><span className="text-6xl opacity-50">🍽️</span></div>
                            )}
                            <button onClick={() => setViewModal(null)} className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{viewModal.name}</h2>
                            <p className="mt-2 text-sm text-gray-500">{viewModal.menu_items_count} food {viewModal.menu_items_count === 1 ? 'item' : 'items'} in this category</p>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => { setViewModal(null); openEdit(viewModal); }} className="flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-medium text-white hover:bg-orange-600">Edit Category</button>
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
                    <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                        <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{editing ? 'Edit Category' : 'Add Category'}</h2>
                            <p className="text-xs text-gray-500">Upload an image to represent this category</p>
                        </div>
                        <form onSubmit={submit} className="p-6">
                            <div className="mb-5">
                                <div onClick={() => fileRef.current?.click()} className="group/upload relative mx-auto h-40 w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-orange-400 hover:bg-orange-50/50 dark:border-gray-600 dark:bg-gray-900 dark:hover:border-orange-500">
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
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload image</p>
                                            <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                                        </div>
                                    )}
                                </div>
                                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                            </div>
                            <div className="mb-5">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Burgers, Pizza, Drinks..." className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" required />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">Cancel</button>
                                <button type="submit" disabled={processing} className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50">{processing ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal open={confirmDelete !== null} title="Delete Category" message="Are you sure? All foods in this category will also be affected." onConfirm={() => deleteCategory(confirmDelete!)} onCancel={() => setConfirmDelete(null)} />
        </AdminLayout>
    );
}
