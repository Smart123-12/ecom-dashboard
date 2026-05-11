import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, CheckCircle, Shield, Truck, RotateCcw } from 'lucide-react';
import { useProductStore, useCartStore, useWishlistStore, useToastStore } from '../lib/store';

const DEMO_REVIEWS = [
  { id: 1, user: 'Rohan P.', rating: 5, date: 'May 5, 2024', comment: 'Excellent product! Fast delivery and great quality.' },
  { id: 2, user: 'Priya M.', rating: 4, date: 'Apr 28, 2024', comment: 'Very good. Exactly as described. Would buy again.' },
  { id: 3, user: 'Karan D.', rating: 5, date: 'Apr 15, 2024', comment: 'Amazing! Best purchase I made this year.' },
  { id: 4, user: 'Sneha J.', rating: 3, date: 'Mar 30, 2024', comment: 'Decent product. Took a bit longer to arrive.' },
];

const Stars = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size} className={i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
    ))}
  </div>
);

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState(DEMO_REVIEWS);
  const [tab, setTab] = useState('reviews');

  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product not found</h2>
          <Link to="/" className="text-[#2874F0] font-bold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const discount = product.original ? Math.round(((product.original - product.price) / product.original) * 100) : 0;
  const isWishlisted = has(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    addToast(`${qty}× "${product.name}" added to cart! 🛒`, 'success');
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    navigate('/checkout');
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews(r => [{ id: Date.now(), user: 'You', rating: reviewRating, date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}), comment: reviewText }, ...r]);
    setReviewText('');
    addToast('Review submitted! ⭐', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      <nav className="bg-[#2874F0] py-3 px-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-white font-extrabold text-xl italic">ShopEx</Link>
          <span className="text-blue-300 text-sm truncate max-w-[200px]">/ {product.name}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-5">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#2874F0] font-semibold hover:underline mb-4">
          <ArrowLeft size={15}/> Back
        </Link>

        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image */}
            <div className="md:w-80 flex-shrink-0">
              <div className="relative">
                <img src={product.img} alt={product.name}
                  className="w-full h-72 md:h-80 object-cover rounded-2xl bg-gray-100"
                  onError={e=>e.target.src='https://placehold.co/320x320?text=No+Image'}/>
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-[#FB641B] text-white text-xs font-extrabold px-2.5 py-1 rounded-full">{discount}% OFF</span>
                )}
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-[#2874F0] text-white text-xs font-bold px-2.5 py-1 rounded-full">{product.badge}</span>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <img src={product.img} className="w-16 h-16 rounded-xl object-cover border-2 border-[#2874F0] bg-gray-100" onError={e=>e.target.style.display='none'}/>
                {[...Array(3)].map((_,i)=>(
                  <div key={i} className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300 text-xs">IMG</div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-xs font-bold text-[#2874F0] uppercase mb-1">{product.category}</p>
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-3">
                <Stars rating={product.rating || 4.5} size={16}/>
                <span className="text-sm font-bold text-yellow-600">{product.rating || 4.5}</span>
                <span className="text-sm text-gray-400">({(product.reviews || 0).toLocaleString()} reviews)</span>
              </div>
              {product.sku && <p className="text-xs text-gray-400 mb-4">SKU: {product.sku}</p>}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                {product.original && <span className="text-lg text-gray-400 line-through">${product.original}</span>}
                {discount > 0 && <span className="text-green-600 font-bold text-sm">{discount}% off</span>}
              </div>

              {/* Stock */}
              <div className="mb-4">
                {product.stock > 0
                  ? <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold"><CheckCircle size={15}/> In Stock ({product.stock} available)</span>
                  : <span className="text-red-500 text-sm font-bold">❌ Out of Stock</span>}
              </div>

              {/* Qty */}
              {product.stock > 0 && (
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Minus size={14}/></button>
                    <span className="w-10 text-center font-bold">{qty}</span>
                    <button onClick={()=>setQty(q=>Math.min(product.stock,q+1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Plus size={14}/></button>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3 mb-6">
                <button onClick={handleAddToCart} disabled={product.stock===0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#2874F0] text-[#2874F0] rounded-xl font-extrabold hover:bg-blue-50 disabled:opacity-40">
                  <ShoppingCart size={18}/> Add to Cart
                </button>
                <button onClick={handleBuyNow} disabled={product.stock===0}
                  className="flex-1 py-3 bg-[#FB641B] text-white rounded-xl font-extrabold hover:bg-orange-600 disabled:opacity-40">
                  Buy Now
                </button>
                <button onClick={()=>{toggle(product);addToast(isWishlisted?'Removed from wishlist':'"'+product.name+'" saved! ❤️',isWishlisted?'info':'success');}}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-colors ${isWishlisted?'border-red-300 bg-red-50':'border-gray-200 hover:border-red-300'}`}>
                  <Heart size={20} className={isWishlisted?'fill-red-500 text-red-500':'text-gray-400'}/>
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[{icon:Truck,label:'Free Delivery',sub:'On orders $50+'},{icon:Shield,label:'Secure Payment',sub:'100% protected'},{icon:RotateCcw,label:'Easy Returns',sub:'7-day return policy'}].map(b=>(
                  <div key={b.label} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                    <b.icon size={18} className="text-[#2874F0] mb-1"/>
                    <p className="text-xs font-bold text-gray-800">{b.label}</p>
                    <p className="text-xs text-gray-400">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex gap-4 border-b border-gray-100 mb-5">
            {['reviews','write'].map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${tab===t?'border-[#2874F0] text-[#2874F0]':'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {t==='reviews'?`Reviews (${reviews.length})`:'Write a Review'}
              </button>
            ))}
          </div>

          {tab==='reviews' && (
            <div className="space-y-4">
              {reviews.map(r=>(
                <div key={r.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2874F0] to-blue-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{r.user[0]}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-sm">{r.user}</span>
                      <Stars rating={r.rating} size={12}/>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==='write' && (
            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Your Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i=>(
                    <button key={i} type="button" onClick={()=>setReviewRating(i)}>
                      <Star size={28} className={i<=reviewRating?'fill-yellow-400 text-yellow-400':'text-gray-200 fill-gray-200'}/>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Your Review</label>
                <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} rows={4}
                  placeholder="Share your experience with this product..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] resize-none"/>
              </div>
              <button type="submit" className="px-8 py-2.5 bg-[#2874F0] text-white rounded-xl font-bold text-sm hover:bg-blue-700">Submit Review</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
