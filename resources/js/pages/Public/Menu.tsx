import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import LoginModal from './components/LoginModal';

interface Food {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_id: number;
}

interface Category {
    id: number;
    name: string;
    icon: string;
}

interface MenuProps {
    foods: Food[];
    categories: Category[];
}

export default function Menu({ foods, categories }: MenuProps) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const filteredFoods = foods.filter(food => {
        const matchesCategory = selectedCategory ? food.category_id === selectedCategory : true;
        const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             food.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categoryIcons: { [key: string]: string } = {
        'Burgers': '🍔', 'Pizza': '🍕', 'Sushi': '🍣', 'Salads': '🥗',
        'Noodles': '🍜', 'Desserts': '🧁', 'Drinks': '🥤', 'default': '🍽️'
    };

    return (
        <>
            <Head title="Our Menu - FoodHub" />

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
                            <Link href="/menu" className="text-orange-600 font-semibold dark:text-orange-400">Menu</Link>
                            <Link href="/about" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Contact</Link>
                            <button onClick={() => setLoginOpen(true)} className="rounded-lg border-2 border-orange-500 px-5 py-2 text-orange-600 hover:bg-orange-50 dark:text-orange-400">Admin Login</button>
                        </div>
                    </div>
                    {menuOpen && (
                        <div className="mt-4 flex flex-col gap-3 md:hidden">
                            <Link href="/" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Home</Link>
                            <Link href="/menu" className="text-orange-600 font-semibold dark:text-orange-400">Menu</Link>
                            <Link href="/about" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">About</Link>
                            <Link href="/contact" className="text-gray-700 hover:text-orange-600 dark:text-gray-300">Contact</Link>
                            <button onClick={() => setLoginOpen(true)} className="rounded-lg border-2 border-orange-500 px-5 py-2 text-center text-orange-600 hover:bg-orange-50 dark:text-orange-400">Admin Login</button>
                        </div>
                    )}
                </nav>

                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-10 sm:py-16">
                    <div className="mx-auto max-w-6xl px-4 text-center text-white sm:px-6">
                        <h1 className="mb-2 text-3xl font-bold sm:mb-4 sm:text-4xl">Our Menu</h1>
                        <p className="text-sm text-orange-100 sm:text-lg">Discover our delicious selection of freshly prepared dishes</p>
                    </div>
                </div>

                {/* Menu Content */}
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
                    {/* Search */}
                    <div className="mb-8 sm:mb-12">
                        <div className="mx-auto mb-6 flex max-w-md sm:mb-8">
                            <input
                                type="text"
                                placeholder="Search for dishes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="min-w-0 flex-1 rounded-l-lg border border-r-0 border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none sm:px-4 sm:py-3 sm:text-base dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <button className="rounded-r-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 sm:px-6 sm:py-3">🔍</button>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`rounded-full px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base transition-all ${
                                    selectedCategory === null
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            >
                                All
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`rounded-full px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base transition-all ${
                                        selectedCategory === category.id
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-1 sm:mr-2">{categoryIcons[category.name] || categoryIcons.default}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-center text-sm text-gray-600 sm:mb-6 dark:text-gray-400">
                        Showing {filteredFoods.length} {filteredFoods.length === 1 ? 'item' : 'items'}
                    </div>

                    {/* Food Grid */}
                    {filteredFoods.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                            {filteredFoods.map((food) => (
                                <div key={food.id} className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
                                    <div className="relative h-40 overflow-hidden sm:h-48">
                                        {food.image_url ? (
                                            <img src={food.image_url} alt={food.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                                                <span className="text-5xl sm:text-6xl">🍽️</span>
                                            </div>
                                        )}
                                        <div className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
                                            ₱{food.price}
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5">
                                        <h3 className="mb-1 text-lg font-semibold text-gray-900 sm:mb-2 sm:text-xl dark:text-white">{food.name}</h3>
                                        <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">{food.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center sm:py-20">
                            <div className="mb-4 text-5xl sm:text-6xl">🍽️</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">No dishes found</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your search or filter</p>
                            <button
                                onClick={() => { setSelectedCategory(null); setSearchTerm(''); }}
                                className="mt-4 rounded-lg bg-orange-500 px-6 py-2 text-sm text-white hover:bg-orange-600"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* App Promotion Banner */}
                    <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center text-white sm:mt-16 sm:p-8">
                        <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">📱</div>
                        <h2 className="mb-2 text-xl font-bold sm:text-2xl">Want to Order?</h2>
                        <p className="mb-4 text-sm text-orange-100 sm:text-base">Download our mobile app to place orders and track delivery</p>
                        <div className="inline-block rounded-lg bg-white/20 px-6 py-2 backdrop-blur-sm">Coming Soon</div>
                    </div>
                </main>

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
