import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, User, Heart, ShoppingBag, ArrowLeft, Edit2, Save, X, Star } from 'lucide-react';
import { useOrderStore, useAuthStore, useWishlistStore, useCartStore, useToastStore } from '../lib/store';

const STATUS_COLOR = { Pending:'bg-yellow-100 text-yellow-700', Processing:'bg-blue-100 text-blue-700', Shipped:'bg-purple-100 text-purple-700', Delivered:'bg-green-100 text-green-700', Cancelled:'bg-red-100 text-red-700' };

const TABS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
];

export default function UserDashboard() {
  const { orders } = useOrderStore();
  const { user, logout } = useAuthStore();
  const { items: wishlist, toggle } = useWishlistStore();
  const { addItem } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const [tab, setTab] = useState('orders');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', phone: '', city: '' });

  // Filter orders that belong to this customer (by email)
  const myOrders = orders.filter(o => o.email === user?.email || o.customer === user?.name).slice(0, 10);

  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      <nav className="bg-[#2874F0] py-3 px-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-white font-extrabold text-xl italic">ShopEx</Link>
            <span className="text-blue-300 text-sm">/ My Account</span>
          </div>
          <Link to="/" className="text-white text-sm hover:underline flex items-center gap-1"><ArrowLeft size={14}/> Shop</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0 space-y-3">
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2874F0] to-blue-400 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {(user?.name || 'G')[0]}
            </div>
            <p className="font-extrabold text-gray-900">{user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
            <span className={`inline-block mt-2 px-2.5 py-0.5 text-xs font-bold rounded-full ${user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : user?.role === 'SELLER' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
              {user?.role || 'USER'}
            </span>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold border-b border-gray-50 last:border-0 transition-colors ${tab === t.id ? 'bg-blue-50 text-[#2874F0]' : 'text-gray-600 hover:bg-gray-50'}`}>
                <t.icon size={16}/>{t.label}
                {t.id === 'orders' && myOrders.length > 0 && <span className="ml-auto bg-[#2874F0] text-white text-xs font-bold px-2 py-0.5 rounded-full">{myOrders.length}</span>}
                {t.id === 'wishlist' && wishlist.length > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{wishlist.length}</span>}
              </button>
            ))}
            <button onClick={() => { logout(); window.location.href = '#/login'; }} className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50">
              <X size={16}/> Logout
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1">
          {/* My Orders */}
          {tab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                <Package size={18} className="text-[#2874F0]"/>
                <h2 className="font-extrabold text-gray-900">My Orders</h2>
                <span className="text-gray-400 text-sm font-normal">({myOrders.length})</span>
              </div>
              {myOrders.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <ShoppingBag size={40} className="mx-auto mb-3 opacity-30"/>
                  <p className="font-semibold">No orders yet</p>
                  <Link to="/" className="text-[#2874F0] text-sm font-bold hover:underline mt-2 block">Start Shopping →</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {myOrders.map(o => (
                    <div key={o.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                      <img src={o.img} alt="" className="w-14 h-14 rounded-xl object-cover bg-gray-100 flex-shrink-0" onError={e=>e.target.style.display='none'}/>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{o.product}</p>
                        <p className="text-xs text-gray-400">{o.id} · {o.date}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Paid via {o.payment}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-extrabold text-gray-900">${o.amount}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[o.status]}`}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2"><User size={18} className="text-[#2874F0]"/><h2 className="font-extrabold text-gray-900">My Profile</h2></div>
                <button onClick={() => { if (editing) addToast('Profile saved! ✅', 'success'); setEditing(!editing); }}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#2874F0] hover:underline">
                  {editing ? <><Save size={15}/> Save</> : <><Edit2 size={15}/> Edit</>}
                </button>
              </div>
              <div className="p-5 space-y-4">
                {[{l:'Full Name',k:'name'},{l:'Email Address',k:'email'},{l:'Phone Number',k:'phone',pl:'Add phone number'},{l:'City',k:'city',pl:'Add your city'}].map(f=>(
                  <div key={f.k}>
                    <label className="text-xs font-bold text-gray-500 uppercase">{f.l}</label>
                    {editing
                      ? <input value={profile[f.k]} onChange={e=>setProfile({...profile,[f.k]:e.target.value})}
                          placeholder={f.pl || ''}
                          className="mt-1 w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0]"/>
                      : <p className="mt-1 text-gray-900 font-semibold">{profile[f.k] || <span className="text-gray-400 font-normal">Not set</span>}</p>
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist */}
          {tab === 'wishlist' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                <Heart size={18} className="text-red-500 fill-red-500"/><h2 className="font-extrabold text-gray-900">My Wishlist</h2>
                <span className="text-gray-400 text-sm font-normal">({wishlist.length})</span>
              </div>
              {wishlist.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <Heart size={40} className="mx-auto mb-3 opacity-20"/>
                  <p className="font-semibold">No saved items</p>
                  <Link to="/" className="text-[#2874F0] text-sm font-bold hover:underline mt-2 block">Browse Products →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-100">
                  {wishlist.map(p=>(
                    <div key={p.id} className="bg-white p-4">
                      <img src={p.img} alt={p.name} className="w-full h-32 object-cover rounded-xl bg-gray-100 mb-3" onError={e=>e.target.src='https://placehold.co/200?text=IMG'}/>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">{p.name}</p>
                      <div className="flex items-center gap-1 mt-1"><Star size={10} className="fill-yellow-400 text-yellow-400"/><span className="text-xs text-gray-400">{p.rating||4.5}</span></div>
                      <p className="font-extrabold text-gray-900 mt-1">${p.price}</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={()=>{addItem(p);addToast('Added to cart 🛒','success');}} className="flex-1 py-1.5 bg-[#2874F0] text-white rounded-lg text-xs font-bold hover:bg-blue-700">Add to Cart</button>
                        <button onClick={()=>toggle(p)} className="p-1.5 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200"><Heart size={14} className="text-red-400 fill-red-400"/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
