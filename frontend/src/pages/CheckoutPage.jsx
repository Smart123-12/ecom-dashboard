import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import { useCartStore, useOrderStore, useAuthStore, useToastStore } from '../lib/store';

const CheckoutPage = () => {
  const { items, count, total: getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [addr, setAddr] = useState({ name: user?.name || '', phone: '', line1: '', city: '', state: '', zip: '', type: 'Home' });
  const [payment, setPayment] = useState('Stripe');
  const [loading, setLoading] = useState(false);
  const grandTotal = getTotal();

  const placeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = '#ORD-' + Math.floor(1000 + Math.random() * 9000);
      addOrder({
        id: orderId,
        customer: addr.name || user?.name || 'Guest',
        email: user?.email || 'guest@example.com',
        product: items.length > 1 ? `${items[0]?.name} +${items.length - 1} more` : (items[0]?.name || 'Order'),
        amount: grandTotal,
        status: 'Processing',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        payment,
        img: items[0]?.img || '',
      });
      clearCart();
      setLoading(false);
      navigate('/order-success', { state: { orderId, total: grandTotal, payment } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      <nav className="bg-[#2874F0] py-3 px-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-white font-extrabold text-xl italic">ShopEx</Link>
          <div className="flex items-center gap-1 ml-4">
            {['Address', 'Payment', 'Confirm'].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${i <= step ? 'bg-white text-[#2874F0]' : 'bg-blue-600 text-blue-200'}`}>
                  {i + 1}. {s}
                </span>
                {i < 2 && <ChevronRight size={12} className="text-blue-300" />}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          {step === 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[#2874F0]" />
                <h2 className="font-extrabold text-gray-900 text-lg">Delivery Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{l:'Full Name *',n:'name'},{l:'Phone *',n:'phone'}].map(f => (
                  <div key={f.n}>
                    <label className="text-xs font-bold text-gray-600 uppercase">{f.l}</label>
                    <input name={f.n} value={addr[f.n]} onChange={e => setAddr({...addr,[e.target.name]:e.target.value})}
                      className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0]" />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-600 uppercase">Address *</label>
                  <input name="line1" value={addr.line1} onChange={e => setAddr({...addr,line1:e.target.value})}
                    className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0]" />
                </div>
                {[{l:'City *',n:'city'},{l:'State *',n:'state'},{l:'ZIP *',n:'zip'}].map(f => (
                  <div key={f.n}>
                    <label className="text-xs font-bold text-gray-600 uppercase">{f.l}</label>
                    <input name={f.n} value={addr[f.n]} onChange={e => setAddr({...addr,[e.target.name]:e.target.value})}
                      className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0]" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {['Home','Work','Other'].map(t => (
                  <label key={t} className={`px-4 py-1.5 rounded-full border text-sm font-bold cursor-pointer ${addr.type===t?'bg-[#2874F0] text-white border-[#2874F0]':'border-gray-200 text-gray-600'}`}>
                    <input type="radio" className="hidden" checked={addr.type===t} onChange={()=>setAddr({...addr,type:t})} />{t}
                  </label>
                ))}
              </div>
              <button onClick={() => { if(!addr.name||!addr.phone||!addr.line1){addToast('Fill required fields','error');return;} setStep(1); }}
                className="w-full py-3 bg-[#FB641B] text-white rounded-xl font-extrabold hover:bg-orange-600">
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-[#2874F0]" />
                <h2 className="font-extrabold text-gray-900 text-lg">Payment Method</h2>
              </div>
              {[
                {id:'Stripe',label:'Credit / Debit Card',icon:'💳',sub:'Visa, Mastercard, Amex'},
                {id:'Razorpay',label:'UPI / NetBanking',icon:'₹',sub:'PhonePe, GPay, BHIM UPI'},
                {id:'PayPal',label:'PayPal',icon:'P',sub:'Pay via PayPal balance'},
                {id:'COD',label:'Cash on Delivery',icon:'💵',sub:'Pay when you receive'},
              ].map(p => (
                <label key={p.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${payment===p.id?'border-[#2874F0] bg-blue-50':'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" className="hidden" checked={payment===p.id} onChange={()=>setPayment(p.id)} />
                  <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">{p.icon}</span>
                  <div><p className="font-bold text-gray-900">{p.label}</p><p className="text-xs text-gray-500">{p.sub}</p></div>
                  {payment===p.id && <CheckCircle size={20} className="text-[#2874F0] ml-auto" />}
                </label>
              ))}
              <div className="flex gap-3">
                <button onClick={()=>setStep(0)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">← Back</button>
                <button onClick={()=>setStep(2)} className="flex-1 py-3 bg-[#FB641B] text-white rounded-xl font-extrabold">Review Order →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-extrabold text-gray-900 text-lg">Confirm Order</h2>
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                <p className="font-bold text-gray-900">{addr.name}</p>
                <p className="text-gray-500">{addr.line1}, {addr.city}, {addr.state} {addr.zip}</p>
                <p className="text-gray-500">{addr.phone} · {addr.type}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <p className="text-gray-500">Payment via: <span className="font-bold text-gray-900">{payment}</span></p>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {items.map(i => (
                  <div key={i.id} className="flex items-center gap-3">
                    <img src={i.img} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100" onError={e=>e.target.style.display='none'} />
                    <div className="flex-1"><p className="text-sm font-semibold">{i.name}</p><p className="text-xs text-gray-500">Qty: {i.qty}</p></div>
                    <p className="font-bold text-sm">${(i.price * i.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={()=>setStep(1)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">← Back</button>
                <button onClick={placeOrder} disabled={loading}
                  className="flex-1 py-3 bg-[#FB641B] text-white rounded-xl font-extrabold disabled:opacity-70 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Placing...</> : 'Place Order 🎉'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-gray-600">
                  <span className="truncate max-w-[130px]">{i.name} ×{i.qty}</span>
                  <span>${(i.price*i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-extrabold text-gray-900">
              <span>Total</span><span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
