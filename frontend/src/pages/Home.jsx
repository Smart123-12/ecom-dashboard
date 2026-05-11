import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Star, ArrowRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const categories = [
  { name: 'Electronics', emoji: '📱', count: 1240 },
  { name: 'Fashion', emoji: '👗', count: 890 },
  { name: 'Home & Living', emoji: '🛋️', count: 620 },
  { name: 'Sports', emoji: '⚽', count: 340 },
  { name: 'Beauty', emoji: '💄', count: 510 },
  { name: 'Books', emoji: '📚', count: 920 },
];

const products = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, original: 399, rating: 4.8, reviews: 2341, badge: 'Best Seller' },
  { id: 2, name: 'Smart Watch Pro Max', price: 199, original: 249, rating: 4.6, reviews: 1892, badge: 'New' },
  { id: 3, name: 'Minimalist Leather Bag', price: 89, original: 129, rating: 4.9, reviews: 762, badge: 'Sale' },
  { id: 4, name: 'Ergonomic Office Chair', price: 449, original: 599, rating: 4.7, reviews: 418, badge: 'Hot' },
  { id: 5, name: 'Organic Skincare Set', price: 59, original: 79, rating: 4.5, reviews: 3102, badge: 'Popular' },
  { id: 6, name: 'Running Shoes Pro', price: 129, original: 169, rating: 4.8, reviews: 1540, badge: 'Trending' },
];

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, title: 'Secure Payment', desc: 'SSL encrypted checkout' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team' },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">ShopEx</span>
          </Link>
          <div className="flex-1 max-w-xl hidden sm:flex items-center border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="flex-1 px-4 py-2.5 text-sm outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400" />
            <button className="px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black"><Search size={18} /></button>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hidden sm:block">Login</Link>
            <Link to="/register" className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl hover:opacity-80 transition-opacity">Sign Up</Link>
            <Link to="/admin" className="text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700 px-3 py-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors hidden md:block">Admin Panel</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">🔥 Summer Sale — Up to 60% OFF</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Discover Premium Products<br/><span className="text-gray-400">At Unbeatable Prices</span></h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Shop the latest trends in electronics, fashion, home & more. Free shipping on every order above $50.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={18} />
            </button>
            <Link to="/admin" className="border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors text-center">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-white dark:text-black" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button key={cat.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group">
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.count}+</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Featured Products</h2>
          <button className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1">View all <ArrowRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              {/* Product Image Placeholder */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 h-48 flex items-center justify-center">
                <span className="text-5xl opacity-30">📦</span>
                <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-lg">{p.badge}</span>
                <button onClick={() => toggleWishlist(p.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                  <Heart size={15} className={wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{p.name}</p>
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{p.rating}</span>
                  <span className="text-xs text-gray-400">({p.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-gray-900 dark:text-white">${p.price}</span>
                  <span className="text-xs text-gray-400 line-through">${p.original}</span>
                  <span className="text-xs text-green-600 font-semibold">{Math.round((1 - p.price/p.original)*100)}% off</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity">
                  <ShoppingCart size={15} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 text-center text-sm">
        <p className="text-white font-bold text-lg mb-2">ShopEx</p>
        <p>© 2024 ShopEx. Built with React + Node.js + PHP.</p>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Support</a>
          <Link to="/admin" className="hover:text-white text-purple-400">Admin Panel</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
