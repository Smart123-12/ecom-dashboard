import { useState } from 'react';
import { Search, Eye, X, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useToastStore } from '../lib/store';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLOR = {
  Pending: 'bg-yellow-100 text-yellow-700', Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700'
};

const INITIAL_ORDERS = [
  { id: '#ORD-5234', customer: 'Aarav Shah', email: 'aarav@example.com', product: 'Samsung Galaxy S24 Ultra', amount: 1099, status: 'Delivered', date: 'May 10, 2024', payment: 'Stripe', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=60&h=60&fit=crop' },
  { id: '#ORD-5233', customer: 'Priya Mehta', email: 'priya@example.com', product: 'Apple AirPods Pro', amount: 189, status: 'Processing', date: 'May 10, 2024', payment: 'Razorpay', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=60&h=60&fit=crop' },
  { id: '#ORD-5232', customer: 'Rohan Patel', email: 'rohan@example.com', product: 'Nike Air Max 270', amount: 150, status: 'Shipped', date: 'May 09, 2024', payment: 'PayPal', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop' },
  { id: '#ORD-5231', customer: 'Sneha Joshi', email: 'sneha@example.com', product: 'Ergonomic Gaming Chair', amount: 399, status: 'Pending', date: 'May 09, 2024', payment: 'Stripe', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=60&h=60&fit=crop' },
  { id: '#ORD-5230', customer: 'Karan Desai', email: 'karan@example.com', product: 'Nikon D3500 DSLR', amount: 489, status: 'Cancelled', date: 'May 08, 2024', payment: 'PayPal', img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=60&h=60&fit=crop' },
  { id: '#ORD-5229', customer: 'Meera Shah', email: 'meera@example.com', product: 'Instant Pot Duo', amount: 79, status: 'Delivered', date: 'May 07, 2024', payment: 'Stripe', img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=60&h=60&fit=crop' },
  { id: '#ORD-5228', customer: 'Dev Parmar', email: 'dev@example.com', product: "Levi's 511 Slim Jeans", amount: 39, status: 'Delivered', date: 'May 06, 2024', payment: 'Razorpay', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=60&h=60&fit=crop' },
];

export default function Orders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [view, setView] = useState(null);
  const [page, setPage] = useState(1);
  const PER = 5;
  const addToast = useToastStore((s) => s.addToast);

  const filtered = orders.filter((o) =>
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search)) &&
    (statusFilter === 'All' || o.status === statusFilter)
  );
  const pages = Math.ceil(filtered.length / PER);
  const paged = filtered.slice((page - 1) * PER, page * PER);

  const updateStatus = (id, newStatus) => {
    setOrders((os) => os.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    if (view?.id === id) setView((v) => ({ ...v, status: newStatus }));
    addToast(`Order ${id} status → ${newStatus} ✅`, 'success');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} total orders · {orders.filter(o => o.status === 'Pending').length} pending</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...STATUSES].map((s) => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-colors ${statusFilter === s ? 'bg-[#2874F0] text-white border-[#2874F0]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by order ID or customer..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Update Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paged.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-[#2874F0] text-xs">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900 dark:text-white">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={o.img} alt="" className="w-8 h-8 rounded-lg object-cover bg-gray-100 flex-shrink-0" onError={(e) => e.target.style.display='none'} />
                      <span className="text-gray-600 dark:text-gray-400 truncate max-w-[120px]">{o.product}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white">${o.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#2874F0] bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setView(o)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-gray-400">No orders found.</td></tr>}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500">Page {page} of {pages}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40"><ChevronLeft size={15}/></button>
              {Array.from({length:pages},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setPage(n)} className={`w-8 h-8 rounded-lg text-xs font-bold ${page===n?'bg-[#2874F0] text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(pages,p+1))} disabled={page===pages} className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40"><ChevronRight size={15}/></button>
            </div>
          </div>
        )}
      </div>

      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-extrabold text-gray-900 dark:text-white">Order Details</h3>
              <button onClick={() => setView(null)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src={view.img} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-100" onError={(e) => e.target.style.display='none'} />
                <div>
                  <p className="font-extrabold text-gray-900 dark:text-white">{view.id}</p>
                  <p className="text-sm text-gray-500">{view.date}</p>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[view.status]}`}>{view.status}</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="font-semibold text-gray-900 dark:text-white">{view.customer}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-semibold text-gray-900 dark:text-white">{view.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Product</span><span className="font-semibold text-gray-900 dark:text-white">{view.product}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-extrabold text-gray-900 dark:text-white">${view.amount}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className="font-semibold text-gray-900 dark:text-white">{view.payment}</span></div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button key={s} onClick={() => updateStatus(view.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-colors ${view.status === s ? 'bg-[#2874F0] text-white border-[#2874F0]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button onClick={() => setView(null)} className="w-full py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
