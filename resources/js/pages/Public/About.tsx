import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import LoginModal from './components/LoginModal';

export default function About() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <Head title="About Us - FoodHub" />

            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
                {/* Navigation */}
                <nav className="mx-auto max-w-6xl p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">🍕</span>
                            <span className="text-xl font-bold text-orange-600 dark:text-orange-400">FoodHub</span>
                        </Link>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
                            {menuOpen ? '✕' : '☰'}
                        </button>
                        <div className="hidden md:flex gap-6 items-center">
                            <Link href="/" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Home</Link>
                            <Link href="/menu" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Menu</Link>
                            <Link href="/about" className="text-orange-600 font-semibold dark:text-orange-400">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Contact</Link>
                            <button onClick={() => setLoginOpen(true)} className="rounded-lg border-2 border-orange-500 px-5 py-2 text-orange-600 hover:bg-orange-50 dark:text-orange-400">Admin Login</button>
                        </div>
                    </div>
                    {menuOpen && (
                        <div className="mt-4 flex flex-col gap-3 md:hidden">
                            <Link href="/" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Home</Link>
                            <Link href="/menu" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Menu</Link>
                            <Link href="/about" className="text-orange-600 font-semibold dark:text-orange-400">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Contact</Link>
                            <button onClick={() => setLoginOpen(true)} className="rounded-lg border-2 border-orange-500 px-5 py-2 text-center text-orange-600 hover:bg-orange-50 dark:text-orange-400">Admin Login</button>
                        </div>
                    )}
                </nav>

                <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-16">
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">About FoodHub</h1>
                    <p className="mb-8 text-center text-base text-gray-600 sm:text-lg dark:text-gray-300">
                        We are passionate about delivering delicious, freshly prepared food right to your doorstep.
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                            <div className="mb-3 text-3xl">🎯</div>
                            <h3 className="mb-2 text-lg font-semibold dark:text-white">Our Mission</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">To make quality food accessible to everyone through technology and great service.</p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                            <div className="mb-3 text-3xl">⭐</div>
                            <h3 className="mb-2 text-lg font-semibold dark:text-white">Quality First</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Fresh ingredients, authentic recipes, and careful preparation in every dish we serve.</p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                            <div className="mb-3 text-3xl">🚀</div>
                            <h3 className="mb-2 text-lg font-semibold dark:text-white">Fast Delivery</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Quick and reliable delivery so your food arrives hot and fresh every time.</p>
                        </div>
                        <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                            <div className="mb-3 text-3xl">💚</div>
                            <h3 className="mb-2 text-lg font-semibold dark:text-white">Community</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Supporting local suppliers and building connections through great food.</p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                        <div className="text-center text-sm text-gray-500">© 2024 FoodHub. All rights reserved.</div>
                    </div>
                </footer>
            </div>

            <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    );
}
