import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore, useToastStore } from '../lib/store';

const COUPONS = {
  SAVE10: { label: '10% OFF', discount: 0.10 },
  FLAT50: { label: '$50 OFF', flat: 50 },
  SHOPEX: { label: '15% OFF', discount: 0.15 },
};

const CartPage = () => {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = applied
    ? applied.flat ? applied.flat : Math.round(subtotal * applied.discount)
    : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setApplied(COUPONS[code]);
      addToast(`Coupon "${code}" applied! ${COUPONS[code].label} 🎉`, 'success');
    } else {
      addToast('Invalid coupon code. Try SAVE10, FLAT50 or SHOPEX', 'error');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { subtotal, discount, shipping, total, items } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center">
        <div className="text-center py-20">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingCart size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add products to your cart to see them here.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#2874F0] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      {/* Navbar */}
      <nav className="bg-[#2874F0] py-3 px-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-white font-extrabold text-xl italic">ShopEx</Link>
          <span className="text-blue-300 text-sm ml-2">/ My Cart</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#2874F0] font-semibold hover:underline mb-4">
          <ArrowLeft size={15} /> Continue Shopping
        </Link>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1 space-y-3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h1 className="text-lg font-extrabold text-gray-900">My Cart <span className="text-gray-400 text-sm font-normal">({items.length} items)</span></h1>
                <button onClick={() => { clearCart(); addToast('Cart cleared', 'info'); }} className="text-xs text-red-500 hover:underline font-semibold">Clear All</button>
              </div>

              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <img src={item.img} alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-100 flex-shrink-0"
                    onError={(e) => e.target.src = 'https://placehold.co/80x80?text=IMG'} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                    <p className="text-lg font-extrabold text-gray-900 mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#2874F0] hover:text-[#2874F0] transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#2874F0] hover:text-[#2874F0] transition-colors">
                      <Plus size={14} />
                    </button>
                    <button onClick={() => { removeItem(item.id); addToast('Item removed', 'info'); }}
                      className="ml-2 p-2 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-[#2874F0]" />
                <p className="font-bold text-gray-900 text-sm">Apply Coupon</p>
              </div>
              <div className="flex gap-2">
                <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Try: SAVE10, FLAT50, SHOPEX"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0]" />
                <button onClick={applyCoupon}
                  className="px-5 py-2 bg-[#2874F0] text-white rounded-xl text-sm font-bold hover:bg-blue-700">Apply</button>
              </div>
              {applied && (
                <div className="mt-2 flex items-center gap-2 text-green-600 text-sm font-semibold">
                  <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs">✓</span>
                  Coupon applied: {applied.label}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-20">
              <h2 className="font-extrabold text-gray-900 mb-4 uppercase text-xs tracking-widest">Price Details</h2>
              <div className="space-y-3 text-sm border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-bold">- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className={shipping === 0 ? 'text-green-600 font-bold' : 'font-semibold'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center font-extrabold text-gray-900 text-lg mb-4">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <p className="text-green-600 text-xs font-semibold mb-4">🎉 You save ${discount.toFixed(2)} on this order!</p>
              )}
              <button onClick={handleCheckout}
                className="w-full py-3.5 bg-[#FB641B] text-white rounded-xl font-extrabold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
