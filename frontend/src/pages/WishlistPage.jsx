import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlistStore, useCartStore, useToastStore } from '../lib/store';

const WishlistPage = () => {
  const { items, toggle } = useWishlistStore();
  const { addItem } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  const moveToCart = (product) => {
    addItem(product);
    toggle(product); // remove from wishlist
    addToast(`"${product.name}" moved to cart! 🛒`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      <nav className="bg-[#2874F0] py-3 px-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-white font-extrabold text-xl italic">ShopEx</Link>
            <span className="text-blue-300 text-sm">/ Wishlist</span>
          </div>
          <Link to="/" className="text-white text-sm hover:underline flex items-center gap-1"><ArrowLeft size={14}/> Shop</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-5">
          <Heart size={22} className="text-red-500 fill-red-500" />
          <h1 className="text-2xl font-extrabold text-gray-900">My Wishlist</h1>
          <span className="text-gray-400 font-normal text-sm">({items.length} items)</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <Heart size={48} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-600">Your wishlist is empty</h2>
            <p className="text-gray-400 mt-2 mb-6">Save items you love by tapping the ❤️ heart icon on any product.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-[#2874F0] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {items.map((p) => (
              <div key={p.id} className="bg-white p-4 flex flex-col group">
                <div className="relative mb-3">
                  <img src={p.img} alt={p.name}
                    className="w-full h-36 object-cover rounded-xl bg-gray-100 group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => e.target.src = 'https://placehold.co/200x140?text=IMG'} />
                  <button onClick={() => { toggle(p); addToast('Removed from wishlist', 'info'); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">{p.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{p.rating ?? 4.5}</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1 mb-3">
                  <span className="font-extrabold text-gray-900">${p.price}</span>
                  {p.original && <span className="text-xs text-gray-400 line-through">${p.original}</span>}
                </div>
                <button onClick={() => moveToCart(p)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#2874F0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
                  <ShoppingCart size={13} /> Move to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
