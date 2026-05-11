import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUp, ArrowDown, Package, Clock } from 'lucide-react';
import { useAuthStore } from '../lib/store';

const revenueData = [
  { name: 'Jan', revenue: 4000, orders: 240 }, { name: 'Feb', revenue: 3200, orders: 180 },
  { name: 'Mar', revenue: 5800, orders: 320 }, { name: 'Apr', revenue: 4900, orders: 280 },
  { name: 'May', revenue: 7200, orders: 410 }, { name: 'Jun', revenue: 6400, orders: 380 },
  { name: 'Jul', revenue: 8900, orders: 490 }, { name: 'Aug', revenue: 7600, orders: 430 },
];

const recentOrders = [
  { id: '#5234', customer: 'Aarav Shah', product: 'Galaxy S24 Ultra', amount: '$1,099', status: 'Delivered', time: '2m ago' },
  { id: '#5233', customer: 'Priya Mehta', product: 'AirPods Pro', amount: '$189', status: 'Processing', time: '15m ago' },
  { id: '#5232', customer: 'Rohan Patel', product: 'Nike Shoes', amount: '$49', status: 'Shipped', time: '1h ago' },
  { id: '#5231', customer: 'Sneha Joshi', product: 'Gaming Chair', amount: '$399', status: 'Pending', time: '3h ago' },
  { id: '#5230', customer: 'Karan Desai', product: 'Instant Pot', amount: '$79', status: 'Cancelled', time: '5h ago' },
];

const topProducts = [
  { name: 'Galaxy S24', sales: 234, percent: 92 }, { name: 'AirPods Pro', sales: 189, percent: 74 },
  { name: 'Nike Shoes', sales: 156, percent: 61 }, { name: 'Gaming Chair', sales: 98, percent: 38 },
];

const statusColor = { Delivered: 'bg-green-100 text-green-700', Processing: 'bg-blue-100 text-blue-700', Shipped: 'bg-purple-100 text-purple-700', Pending: 'bg-yellow-100 text-yellow-700', Cancelled: 'bg-red-100 text-red-700' };

const StatCard = ({ title, value, change, positive, icon: Icon, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br ${gradient} shadow-lg`}>
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
    <div className="absolute -right-2 -bottom-6 w-32 h-32 rounded-full bg-white/5" />
    <div className="relative">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Icon size={20} /></div>
        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-white/20' : 'bg-black/20'}`}>
          {positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />} {change}
        </span>
      </div>
      <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-extrabold mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back, <span className="font-semibold text-[#2874F0]">{user?.name || 'Admin'}</span> — here's what's happening today.</p>
        </div>
        <button className="bg-[#2874F0] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2">
          <TrendingUp size={16} /> Download Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$87,420" change="+20.1%" positive icon={DollarSign} gradient="from-[#2874F0] to-blue-700" />
        <StatCard title="Total Orders" value="4,352" change="+15%" positive icon={ShoppingBag} gradient="from-purple-500 to-purple-700" />
        <StatCard title="Customers" value="12,891" change="+7.2%" positive icon={Users} gradient="from-green-500 to-green-700" />
        <StatCard title="Products" value="2,408" change="-2 low stock" positive={false} icon={Package} gradient="from-orange-500 to-red-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-extrabold text-gray-900 dark:text-white">Revenue Analytics</h2>
              <p className="text-xs text-gray-400 mt-0.5">Last 8 months performance</p>
            </div>
            <div className="flex gap-2">
              {['1W', '1M', '3M', '1Y'].map((t, i) => (
                <button key={t} className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${i === 1 ? 'bg-[#2874F0] text-white' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2874F0" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2874F0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }} formatter={(v) => [`$${v}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#2874F0" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="font-extrabold text-gray-900 dark:text-white mb-1">Top Products</h2>
          <p className="text-xs text-gray-400 mb-5">By sales volume this month</p>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2874F0]/10 text-[#2874F0] text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    {p.name}
                  </span>
                  <span className="text-xs font-bold text-gray-500">{p.sales}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2874F0] to-blue-400 rounded-full transition-all duration-1000"
                    style={{ width: `${p.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#2874F0]" />
            <h2 className="font-extrabold text-gray-900 dark:text-white">Recent Orders</h2>
          </div>
          <button className="text-sm text-[#2874F0] font-bold hover:underline flex items-center gap-1">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wide">
              <tr>{['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Time'].map((h) => (
                <th key={h} className="px-5 py-3">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#2874F0]">{o.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">{o.customer}</td>
                  <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{o.product}</td>
                  <td className="px-5 py-3.5 font-extrabold text-gray-900 dark:text-white">{o.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
