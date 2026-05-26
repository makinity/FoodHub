import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="FoodHub - Discover Amazing Food" />

            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
                {/* Navigation */}
                <nav className="mx-auto flex max-w-6xl items-center justify-between p-6">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍕</span>
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-400">FoodHub</span>
                    </div>
                    <div className="flex gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-5 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="mx-auto max-w-6xl px-6 py-12">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        {/* Left Column - Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                                🍕 Craving something delicious?
                            </div>

                            <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
                                Discover Amazing
                                <span className="block text-orange-500">Food Near You</span>
                            </h1>

                            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                                From local gems to popular restaurants, FoodHub connects you
                                with the best dining experiences in your area.
                            </p>

                            {/* Search Bar */}
                            <div className="mb-6 flex max-w-md mx-auto lg:mx-0">
                                <input
                                    type="text"
                                    placeholder="Search for restaurants..."
                                    className="flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                                />
                                <button className="rounded-r-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600">
                                    Search
                                </button>
                            </div>

                            {/* Features */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Fast Delivery (30min)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-600">✓</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Quality Guaranteed</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            {!auth.user && (
                                <div className="mt-8 flex gap-4">
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
                                    >
                                        Join FoodHub
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border-2 border-orange-500 px-8 py-3 font-semibold text-orange-600 hover:bg-orange-50 dark:text-orange-400"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Food Icons Grid */}
                        <div className="flex-1">
                            <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-8">
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                        <div className="text-4xl">🍔</div>
                                        <p className="mt-1 text-sm text-white">Burgers</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                        <div className="text-4xl">🍕</div>
                                        <p className="mt-1 text-sm text-white">Pizza</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                        <div className="text-4xl">🍣</div>
                                        <p className="mt-1 text-sm text-white">Sushi</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                        <div className="text-4xl">🥗</div>
                                        <p className="mt-1 text-sm text-white">Salads</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                        <div className="text-4xl">🍜</div>
                                        <p className="mt-1 text-sm text-white">Noodles</p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                                        <div className="text-4xl">🧁</div>
                                        <p className="mt-1 text-sm text-white">Desserts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-12 border-t border-gray-200 py-6 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-500">
                        Trusted by 10,000+ food lovers • 500+ restaurants • 25+ cities
                    </p>
                </footer>
            </div>
        </>
    );
}
