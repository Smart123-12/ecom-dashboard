import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToastStore, useProductStore } from '../lib/store';

const CATS = ['Mobiles', 'Electronics', 'Fashion', 'Furniture', 'Appliances', 'Beauty', 'Books', 'Sports'];
const STATUS_COLOR = { Active: 'bg-green-100 text-green-700', 'Low Stock': 'bg-yellow-100 text-yellow-700', 'Out of Stock': 'bg-red-100 text-red-700', Inactive: 'bg-gray-100 text-gray-600' };

function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || { name: '', category: 'Electronics', price: '', stock: '', sku: '', status: 'Active', img: '' });
  const set = (e) => { const { name, value } = e.target; setForm((f) => ({ ...f, [name]: value })); };
  const submit = (e) => { e.preventDefault(); onSave({ ...form, price: Number(form.price), stock: Number(form.stock), id: form.id || Date.now() }); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          {form.img && <img src={form.img} alt="preview" className="w-full h-40 object-cover rounded-xl bg-gray-100" onError={(e) => e.target.style.display = 'none'} />}
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Image URL</label>
            <input name="img" value={form.img} onChange={set} placeholder="https://images.unsplash.com/..." className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Product Name *</label>
            <input name="name" required value={form.name} onChange={set} placeholder="Product name" className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Category</label>
              <select name="category" value={form.category} onChange={set} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">SKU</label>
              <input name="sku" value={form.sku} onChange={set} placeholder="MOB-001" className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Price ($) *</label>
              <input name="price" type="number" min="0" step="0.01" required value={form.price} onChange={set} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Stock *</label>
              <input name="stock" type="number" min="0" required value={form.stock} onChange={set} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-2 block">Status</label>
            <div className="flex flex-wrap gap-2">
              {['Active', 'Inactive', 'Low Stock', 'Out of Stock'].map((s) => (
                <label key={s} className={`px-3 py-1.5 rounded-lg border cursor-pointer text-xs font-bold transition-colors ${form.status === s ? 'bg-[#2874F0] text-white border-[#2874F0]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <input type="radio" name="status" value={s} checked={form.status === s} onChange={set} className="hidden" />{s}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-[#2874F0] text-white rounded-xl text-sm font-bold hover:bg-blue-700">{product ? 'Update' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState(null);
  const [view, setView] = useState(null);
  const [del, setDel] = useState(null);
  const [page, setPage] = useState(1);
  const PER = 6;
  const addToast = useToastStore((s) => s.addToast);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) && (cat === 'All' || p.category === cat));
  const pages = Math.ceil(filtered.length / PER);
  const paged = filtered.slice((page - 1) * PER, page * PER);

  const save = (data) => {
    if (products.find((p) => p.id === data.id)) {
      updateProduct(data);
      addToast('Product updated! ✅', 'success');
    } else {
      addProduct(data);
      addToast('Product added! 🎉 Visible on Home page now!', 'success');
    }
    setModal(null);
  };

  const remove = () => {
    deleteProduct(del.id);
    addToast(`"${del.name}" deleted.`, 'info');
    setDel(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products · {products.filter(p => p.stock === 0).length} out of stock</p>
        </div>
        <button onClick={() => setModal('new')} className="flex items-center gap-2 bg-[#2874F0] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <select value={cat} onChange={(e) => { setCat(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option>All</option>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paged.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.img} alt={p.name} className="w-11 h-11 rounded-xl object-cover border border-gray-100 bg-gray-100 flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[160px]">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{p.sku}</td>
                  <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white">${p.price}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: p.stock === 0 ? '#ef4444' : p.stock < 10 ? '#d97706' : '#374151' }}>{p.stock}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[p.status]}`}>{p.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setView(p)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View"><Eye size={15} /></button>
                      <button onClick={() => setModal(p)} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit"><Edit2 size={15} /></button>
                      <button onClick={() => setDel(p)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-gray-400">No products found.</td></tr>}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500">Page {page} of {pages}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40"><ChevronLeft size={15} /></button>
              {Array.from({length: pages},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setPage(n)} className={`w-8 h-8 rounded-lg text-xs font-bold ${page===n?'bg-[#2874F0] text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{n}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(pages, p+1))} disabled={page===pages} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40"><ChevronRight size={15} /></button>
            </div>
          </div>
        )}
      </div>

      {modal && <ProductForm product={modal === 'new' ? null : modal} onSave={save} onClose={() => setModal(null)} />}

      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-extrabold text-gray-900 dark:text-white">Product Details</h3>
              <button onClick={() => setView(null)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-5 space-y-3">
              <img src={view.img} alt={view.name} className="w-full h-48 object-cover rounded-xl bg-gray-100" onError={(e) => { e.target.src = 'https://placehold.co/400x200?text=No+Image'; }} />
              <p className="font-extrabold text-lg text-gray-900 dark:text-white">{view.name}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>SKU: <b className="text-gray-800 dark:text-white">{view.sku}</b></span>
                <span>Price: <b className="text-gray-800 dark:text-white">${view.price}</b></span>
                <span>Category: <b className="text-gray-800 dark:text-white">{view.category}</b></span>
                <span>Stock: <b className="text-gray-800 dark:text-white">{view.stock}</b></span>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[view.status]}`}>{view.status}</span>
            </div>
            <div className="p-5 pt-0 flex gap-2">
              <button onClick={() => { setModal(view); setView(null); }} className="flex-1 py-2 bg-[#2874F0] text-white rounded-xl font-bold text-sm">Edit</button>
              <button onClick={() => setView(null)} className="flex-1 py-2 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">Close</button>
            </div>
          </div>
        </div>
      )}

      {del && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-extrabold text-gray-900 dark:text-white mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-5">This will permanently delete <b>"{del.name}"</b>.</p>
            <div className="flex gap-3">
              <button onClick={() => setDel(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">Cancel</button>
              <button onClick={remove} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
