import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Star, ArrowRight, Truck, Shield, RefreshCw, Tag, ChevronRight, Bell, User } from 'lucide-react';
import { useCartStore, useWishlistStore, useAuthStore, useToastStore } from '../lib/store';

const CATEGORIES = [
  { name: 'Mobiles', emoji: '📱', color: 'from-blue-400 to-blue-600' },
  { name: 'Fashion', emoji: '👗', color: 'from-pink-400 to-pink-600' },
  { name: 'Electronics', emoji: '💻', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Home', emoji: '🛋️', color: 'from-orange-400 to-orange-600' },
  { name: 'Appliances', emoji: '🎮', color: 'from-green-400 to-green-600' },
  { name: 'Travel', emoji: '✈️', color: 'from-purple-400 to-purple-600' },
  { name: 'Beauty', emoji: '💄', color: 'from-rose-400 to-rose-600' },
  { name: 'Toys', emoji: '🧸', color: 'from-yellow-400 to-yellow-600' },
];

const PRODUCTS = [
  { id: 1, name: 'Samsung Galaxy S24 Ultra', category: 'Mobiles', price: 1099, original: 1399, rating: 4.7, reviews: 23450, img: '📱', badge: 'Best Seller', assured: true },
  { id: 2, name: 'Apple AirPods Pro (2nd Gen)', category: 'Electronics', price: 189, original: 249, rating: 4.9, reviews: 41200, img: '🎧', badge: 'Trending', assured: true },
  { id: 3, name: 'Puma Men\'s Running Shoes', category: 'Fashion', price: 49, original: 89, rating: 4.5, reviews: 8920, img: '👟', badge: 'New', assured: false },
  { id: 4, name: 'Ergonomic Gaming Chair Pro', category: 'Home', price: 399, original: 599, rating: 4.6, reviews: 3120, img: '🪑', badge: 'Hot Deal', assured: true },
  { id: 5, name: 'Nikon D3500 DSLR Camera', category: 'Electronics', price: 489, original: 649, rating: 4.8, reviews: 15670, img: '📷', badge: 'Popular', assured: true },
  { id: 6, name: 'Instant Pot Duo 7-in-1', category: 'Appliances', price: 79, original: 129, rating: 4.7, reviews: 54800, img: '🍲', badge: 'Deal of Day', assured: false },
  { id: 7, name: 'Levi\'s 511 Slim Fit Jeans', category: 'Fashion', price: 39, original: 69, rating: 4.4, reviews: 12300, img: '👖', badge: 'Clearance', assured: false },
  { id: 8, name: 'Mi Smart Band 8', category: 'Mobiles', price: 29, original: 49, rating: 4.6, reviews: 89200, img: '⌚', badge: 'Flash Sale', assured: true },
];

const DEALS = [
  { label: '72% OFF', category: 'Top Deals on Mobiles', img: '📱', color: 'bg-blue-50 border-blue-200' },
  { label: '50% OFF', category: 'Best in Fashion', img: '👗', color: 'bg-pink-50 border-pink-200' },
  { label: '45% OFF', category: 'Electronics Bonanza', img: '💻', color: 'bg-indigo-50 border-indigo-200' },
  { label: '60% OFF', category: 'Home Must-Haves', img: '🛋️', color: 'bg-orange-50 border-orange-200' },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartAnimate, setCartAnimate] = useState(null);
  const navigate = useNavigate();
  const { addItem, count } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const handleAddToCart = (product) => {
    addItem(product);
    setCartAnimate(product.id);
    setTimeout(() => setCartAnimate(null), 600);
    addToast(`"${product.name}" added to cart! 🛒`, 'success');
  };

  const handleWishlist = (product) => {
    toggle(product);
    addToast(has(product.id) ? 'Removed from wishlist' : `"${product.name}" added to wishlist! ❤️`, has(product.id) ? 'info' : 'success');
  };

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategory === 'All' || p.category === activeCategory)
  );

  const cartCount = count();

  return (
    <div className="min-h-screen bg-[#F1F3F6] font-sans">
      {/* Navbar - Flipkart style */}
      <nav className="bg-[#2874F0] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-2">
            <div className="text-white">
              <p className="text-xl font-extrabold italic leading-tight">ShopEx</p>
              <p className="text-[10px] text-yellow-300 italic font-medium -mt-0.5">Explore <span className="underline">Plus</span> ✦</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex items-center bg-white rounded-lg overflow-hidden max-w-2xl shadow-md">
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products, brands and more"
              className="flex-1 px-4 py-2.5 text-sm outline-none text-gray-800" />
            <button className="px-5 py-2.5 bg-[#2874F0] text-white hover:bg-blue-700 transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-1 bg-white text-[#2874F0] px-3 py-2 rounded-lg text-sm font-bold cursor-pointer hover:bg-blue-50">
                <User size={16} />
                <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-[#2874F0] px-5 py-2 rounded-lg text-sm font-extrabold hover:bg-blue-50">Login</Link>
            )}
            <button onClick={() => navigate('/admin')} className="relative text-white px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors" title="Admin Panel">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/admin" className="text-white text-xs font-semibold bg-blue-700 px-3 py-2 rounded-lg hover:bg-blue-800 hidden md:block">
              Admin ↗
            </Link>
          </div>
        </div>

        {/* Category Nav Row */}
        <div className="bg-white/5 border-t border-blue-500">
          <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto py-2 scrollbar-hide">
            {['All', ...CATEGORIES.map((c) => c.name)].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold whitespace-nowrap pb-1 transition-all ${
                  activeCategory === cat
                    ? 'text-yellow-300 border-b-2 border-yellow-300'
                    : 'text-blue-100 hover:text-white'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#2874F0] to-blue-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-6">
            <div className="text-white space-y-4 flex-1">
              <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-extrabold px-3 py-1 rounded-full">🔥 SALE LIVE NOW</span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Big Billion<br/>Days Sale</h1>
              <p className="text-blue-200 text-sm md:text-base">Up to <span className="text-yellow-300 font-extrabold text-xl">80% OFF</span> on 10 Lakh+ Products</p>
              <div className="flex gap-3 pt-2">
                <button className="bg-white text-[#2874F0] px-6 py-2.5 rounded-xl font-extrabold text-sm hover:bg-yellow-50 transition-colors shadow-lg">
                  Shop Now →
                </button>
                <Link to="/seller" className="border border-white/40 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
                  Sell on ShopEx
                </Link>
              </div>
            </div>
            <div className="text-[120px] md:text-[160px] leading-none opacity-80 select-none">🛍️</div>
          </div>
        </div>

        {/* Deals Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DEALS.map((d) => (
            <div key={d.label} className={`${d.color} border rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow`}>
              <span className="text-4xl">{d.img}</span>
              <div>
                <p className="text-xl font-extrabold text-gray-900">{d.label}</p>
                <p className="text-xs text-gray-600 font-medium">{d.category}</p>
                <p className="text-xs text-[#2874F0] font-bold mt-1 flex items-center gap-0.5">Shop <ChevronRight size={12} /></p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-gray-900">Shop by Category</h2>
            <button className="text-[#2874F0] text-sm font-bold flex items-center gap-1">View All <ArrowRight size={14} /></button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-2 group transition-transform hover:scale-105 ${activeCategory === cat.name ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md`}>
                  {cat.emoji}
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900">
              {activeCategory === 'All' ? 'Trending Products' : `Top ${activeCategory}`}
              <span className="text-sm text-gray-400 font-normal ml-2">({filtered.length} items)</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white p-4 hover:shadow-lg transition-all duration-200 group relative">
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#2874F0] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">{p.badge}</span>
                </div>
                {/* Wishlist */}
                <button onClick={() => handleWishlist(p)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                  <Heart size={14} className={has(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button>
                {/* Product Image */}
                <div className="h-40 flex items-center justify-center text-6xl bg-gray-50 rounded-xl mb-3 group-hover:scale-105 transition-transform duration-200">
                  {p.img}
                </div>
                {/* Info */}
                <div className="space-y-1">
                  {p.assured && (
                    <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">✓ ASSURED</span>
                  )}
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{p.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                      {p.rating} <Star size={10} className="fill-white" />
                    </span>
                    <span className="text-xs text-gray-400">({(p.reviews / 1000).toFixed(1)}K)</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-gray-900">${p.price}</span>
                    <span className="text-xs text-gray-400 line-through">${p.original}</span>
                    <span className="text-xs text-green-600 font-bold">{Math.round((1 - p.price/p.original)*100)}% off</span>
                  </div>
                </div>
                {/* Add to Cart */}
                <button onClick={() => handleAddToCart(p)}
                  className={`mt-3 w-full py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    cartAnimate === p.id
                      ? 'bg-green-500 text-white scale-95'
                      : 'bg-[#FF6161] text-white hover:bg-red-600'
                  }`}>
                  <ShoppingCart size={15} />
                  {cartAnimate === p.id ? 'Added! ✓' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <Search size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No products found for "{search}"</p>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'On orders above $50', color: 'text-blue-600 bg-blue-50' },
              { icon: Shield, title: '100% Secure', desc: 'SSL encrypted payments', color: 'text-green-600 bg-green-50' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '10-day return policy', color: 'text-orange-600 bg-orange-50' },
              { icon: Tag, title: 'Best Prices', desc: 'Guaranteed lowest price', color: 'text-purple-600 bg-purple-50' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#172337] text-gray-400 mt-10 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-8">
          {[
            { title: 'About', links: ['About Us', 'Careers', 'Press', 'Blog'] },
            { title: 'Help', links: ['Payments', 'Shipping', 'Cancellation', 'FAQ'] },
            { title: 'Policy', links: ['Returns Policy', 'Terms of Use', 'Privacy', 'Security'] },
            { title: 'Quick Links', links: ['Admin Panel', 'Seller Dashboard', 'Login', 'Register'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-bold text-xs uppercase tracking-widest mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-xs">
          <p className="text-white font-bold text-lg mb-1">🛍️ ShopEx</p>
          <p>© 2024 ShopEx. All rights reserved. Built with React + Node.js + PHP</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
