import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

export default function Reports() {
    return (
        <AdminLayout>
            <Head title="Reports - FoodHub Admin" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
                <p className="mt-1 text-sm text-gray-500">View sales and analytics</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h3 className="font-semibold dark:text-white">📊 Sales Report</h3>
                        <p className="mt-1 text-sm text-gray-500">Coming soon — daily/weekly/monthly sales breakdown</p>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h3 className="font-semibold dark:text-white">🏆 Top Selling Items</h3>
                        <p className="mt-1 text-sm text-gray-500">Coming soon — most ordered food items</p>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h3 className="font-semibold dark:text-white">📈 Order Trends</h3>
                        <p className="mt-1 text-sm text-gray-500">Coming soon — order volume over time</p>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h3 className="font-semibold dark:text-white">📄 Export Data</h3>
                        <p className="mt-1 text-sm text-gray-500">Coming soon — export to PDF/CSV</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
