import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import LoginModal from './components/LoginModal';

export default function Landing() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <Head title="FoodHub - Delicious Food, Delivered to Your Door" />

            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
                {/* Navigation */}
                <nav className="mx-auto max-w-6xl p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🍕</span>
                            <span className="text-xl font-bold text-orange-600 dark:text-orange-400">FoodHub</span>
                        </div>
                        {/* Mobile toggle */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
                            {menuOpen ? '✕' : '☰'}
                        </button>
                        {/* Desktop nav */}
                        <div className="hidden md:flex gap-6 items-center">
                            <Link href="/" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Home</Link>
                            <Link href="/menu" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Menu</Link>
                            <Link href="/about" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Contact</Link>
                            <button onClick={() => setLoginOpen(true)} className="rounded-lg border-2 border-orange-500 px-5 py-2 text-orange-600 hover:bg-orange-50 dark:text-orange-400">Admin Login</button>
                        </div>
                    </div>
                    {/* Mobile nav */}
                    {menuOpen && (
                        <div className="mt-4 flex flex-col gap-3 md:hidden">
                            <Link href="/" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Home</Link>
                            <Link href="/menu" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Menu</Link>
                            <Link href="/about" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Contact</Link>
                            <button onClick={() => setLoginOpen(true)} className="rounded-lg border-2 border-orange-500 px-5 py-2 text-center text-orange-600 hover:bg-orange-50 dark:text-orange-400">Admin Login</button>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
                    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                        {/* Left Column */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm text-orange-700 dark:bg-orange-900/30">
                                🍕 Order Your Favorites
                            </div>

                            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                Delicious Food
                                <span className="block text-orange-500">Delivered to Your Door</span>
                            </h1>

                            <p className="mb-6 text-base text-gray-600 sm:text-lg dark:text-gray-300">
                                Browse our menu, discover your favorites, and order easily through our mobile app.
                                Fresh ingredients, authentic flavors, fast delivery.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                <Link
                                    href="/menu"
                                    className="rounded-lg bg-orange-500 px-8 py-3 text-center font-semibold text-white hover:bg-orange-600 transition-all"
                                >
                                    View Full Menu
                                </Link>
                                <div className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-5 py-2 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-gray-500">Order on our mobile app</span>
                                        <span className="text-sm font-semibold">Coming Soon</span>
                                    </div>
                                    <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                        <span className="text-xl">📱</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Food Showcase */}
                        <div className="w-full flex-1">
                            <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-6 sm:p-8">
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                                    <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm sm:p-4">
                                        <div className="text-3xl sm:text-4xl">🍔</div>
                                        <p className="mt-1 text-xs text-white sm:text-sm">Burgers</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm sm:p-4">
                                        <div className="text-3xl sm:text-4xl">🍕</div>
                                        <p className="mt-1 text-xs text-white sm:text-sm">Pizza</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm sm:p-4">
                                        <div className="text-3xl sm:text-4xl">🍣</div>
                                        <p className="mt-1 text-xs text-white sm:text-sm">Sushi</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm sm:p-4">
                                        <div className="text-3xl sm:text-4xl">🥗</div>
                                        <p className="mt-1 text-xs text-white sm:text-sm">Salads</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm sm:p-4">
                                        <div className="text-3xl sm:text-4xl">🍜</div>
                                        <p className="mt-1 text-xs text-white sm:text-sm">Noodles</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm sm:p-4">
                                        <div className="text-3xl sm:text-4xl">🧁</div>
                                        <p className="mt-1 text-xs text-white sm:text-sm">Desserts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl dark:text-white">
                        How It Works
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">📱</div>
                            <h3 className="mb-2 text-xl font-semibold">1. Download App</h3>
                            <p className="text-gray-600 dark:text-gray-300">Get our mobile app from your app store</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">🍽️</div>
                            <h3 className="mb-2 text-xl font-semibold">2. Browse Menu</h3>
                            <p className="text-gray-600 dark:text-gray-300">Explore our delicious food options</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">🚚</div>
                            <h3 className="mb-2 text-xl font-semibold">3. Get Delivery</h3>
                            <p className="text-gray-600 dark:text-gray-300">Enjoy hot food delivered to your door</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                            <div>
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">FoodHub</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Delicious food delivered fast</p>
                            </div>
                            <div>
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Quick Links</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><Link href="/menu">Menu</Link></li>
                                    <li><Link href="/about">About Us</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Admin</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><button onClick={() => setLoginOpen(true)} className="hover:text-orange-600">Admin Login</button></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Mobile App</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Coming soon to iOS and Android</p>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm text-gray-500">© 2024 FoodHub. All rights reserved.</div>
                    </div>
                </footer>
            </div>

            <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    );
}
