import { useState } from 'react';
import { Package, ShoppingBag, TrendingUp, DollarSign, Plus, BarChart2, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { useProductStore, useAuthStore, useToastStore } from '../lib/store';

const earningsData = [
  { month: 'Jan', earnings: 1200 }, { month: 'Feb', earnings: 1800 }, { month: 'Mar', earnings: 1400 },
  { month: 'Apr', earnings: 2200 }, { month: 'May', earnings: 1900 }, { month: 'Jun', earnings: 2800 },
  { month: 'Jul', earnings: 3200 },
];

const CATS = ['Mobiles', 'Electronics', 'Fashion', 'Furniture', 'Appliances', 'Beauty', 'Books', 'Sports'];

const SellerDashboard = () => {
  const { products, addProduct, deleteProduct } = useProductStore();
  const { user } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Electronics', price: '', original: '', stock: '', sku: '', img: '', status: 'Active' });

  const myProducts = products.filter((p) => p.addedBy === 'seller');

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct({ ...form, price: Number(form.price), original: Number(form.original) || Math.round(Number(form.price) * 1.3), stock: Number(form.stock), addedBy: 'seller', badge: 'New' });
    addToast('Product added! 🎉 Now visible on the Store!', 'success');
    setShowAdd(false);
    setForm({ name: '', category: 'Electronics', price: '', original: '', stock: '', sku: '', img: '', status: 'Active' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      deleteProduct(id);
      addToast(`"${name}" deleted.`, 'info');
    }
  };

  const stats = [
    { label: 'Total Earnings', value: '$23,793', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Total Orders', value: '148', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Products Listed', value: String(myProducts.length), icon: Package, color: 'bg-purple-50 text-purple-600' },
    { label: 'Conversion Rate', value: '3.8%', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2874F0] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">Seller Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-gray-500 hover:text-black dark:hover:text-white">View Store</Link>
          <Link to="/admin" className="text-sm bg-[#2874F0] text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">Admin Panel</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Seller Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, <span className="font-semibold text-[#2874F0]">{user?.name || 'Seller'}</span> — manage your products and earnings.</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-[#2874F0] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-blue-700 text-sm shadow-lg shadow-blue-200">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={18} className="text-[#2874F0]" />
            <h2 className="font-extrabold text-gray-900 dark:text-white">Monthly Earnings</h2>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2874F0" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2874F0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => [`$${v}`, 'Earnings']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="earnings" stroke="#2874F0" strokeWidth={2.5} fill="url(#eg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Products */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-extrabold text-gray-900 dark:text-white">My Products <span className="text-gray-400 font-normal text-sm">({myProducts.length})</span></h2>
            <button onClick={() => setShowAdd(true)} className="text-sm text-[#2874F0] font-bold hover:underline flex items-center gap-1"><Plus size={14} /> Add New</button>
          </div>
          {myProducts.length === 0 ? (
            <div className="py-14 text-center text-gray-400">
              <Package size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No products yet</p>
              <p className="text-sm mt-1">Click "Add Product" to list your first product!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Stock</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {myProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" onError={(e) => e.target.style.display = 'none'} />
                          <span className="font-semibold text-gray-900 dark:text-white">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-extrabold text-gray-900 dark:text-white">${p.price}</td>
                      <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{p.stock}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button onClick={() => handleDelete(p.id, p.name)} className="text-xs text-red-500 hover:text-red-700 font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Add New Product</h3>
              <button onClick={() => setShowAdd(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleAdd} className="p-5 space-y-4">
              {form.img && <img src={form.img} alt="preview" className="w-full h-36 object-cover rounded-xl bg-gray-100" onError={(e) => e.target.style.display = 'none'} />}
              {[
                { label: 'Product Name *', name: 'name', placeholder: 'e.g. Samsung Galaxy S24', required: true },
                { label: 'Image URL', name: 'img', placeholder: 'https://images.unsplash.com/...' },
                { label: 'SKU', name: 'sku', placeholder: 'MOB-001' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">{f.label}</label>
                  <input name={f.name} required={f.required} value={form[f.name]} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    placeholder={f.placeholder}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Category</label>
                <select name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Price ($) *', name: 'price', placeholder: '0.00', required: true },
                  { label: 'Original ($)', name: 'original', placeholder: '0.00' },
                  { label: 'Stock *', name: 'stock', placeholder: '0', required: true },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">{f.label}</label>
                    <input type="number" min="0" name={f.name} required={f.required} value={form[f.name]} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#2874F0] text-white rounded-xl font-bold text-sm hover:bg-blue-700">Add to Store</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
