import { Package, ShoppingBag, TrendingUp, DollarSign, Plus, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const earningsData = [
  { month: 'Jan', earnings: 1200 }, { month: 'Feb', earnings: 1800 }, { month: 'Mar', earnings: 1400 },
  { month: 'Apr', earnings: 2200 }, { month: 'May', earnings: 1900 }, { month: 'Jun', earnings: 2800 },
  { month: 'Jul', earnings: 3200 },
];

const myProducts = [
  { name: 'Premium Headphones', sold: 42, stock: 12, earnings: '$12,558', status: 'Active' },
  { name: 'Leather Wallet', sold: 87, stock: 3, earnings: '$3,654', status: 'Low Stock' },
  { name: 'Smart Watch', sold: 19, stock: 25, earnings: '$7,581', status: 'Active' },
];

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-black font-bold">E</span>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">Seller Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-gray-500 hover:text-black dark:hover:text-white">View Store</Link>
          <Link to="/admin" className="text-sm bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg font-medium hover:opacity-80">Admin Panel</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Seller Dashboard</h1>
            <p className="text-sm text-gray-500">Track your sales, inventory, and earnings.</p>
          </div>
          <Link to="/admin/products" className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl font-medium hover:opacity-80 text-sm">
            <Plus size={16} /> Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Earnings', value: '$23,793', icon: DollarSign, color: 'bg-green-50 text-green-600' },
            { label: 'Total Orders', value: '148', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
            { label: 'Products Listed', value: '23', icon: Package, color: 'bg-purple-50 text-purple-600' },
            { label: 'Conversion Rate', value: '3.8%', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon size={20} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={18} className="text-gray-500" />
            <h2 className="font-bold text-gray-900 dark:text-white">Monthly Earnings</h2>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => [`$${v}`, 'Earnings']} />
                <Area type="monotone" dataKey="earnings" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#earningsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Products Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white">My Products</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
              <tr>
                {['Product', 'Units Sold', 'Stock', 'Earnings', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {myProducts.map((p) => (
                <tr key={p.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{p.name}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{p.sold}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{p.stock}</td>
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{p.earnings}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
