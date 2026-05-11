import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 4200, returns: 400 }, { month: 'Feb', sales: 3800, returns: 300 },
  { month: 'Mar', sales: 5200, returns: 520 }, { month: 'Apr', sales: 4700, returns: 410 },
  { month: 'May', sales: 6100, returns: 600 }, { month: 'Jun', sales: 5400, returns: 490 },
  { month: 'Jul', sales: 7200, returns: 700 }, { month: 'Aug', sales: 6800, returns: 580 },
];

const categoryData = [
  { name: 'Electronics', value: 4200 }, { name: 'Apparel', value: 2800 },
  { name: 'Furniture', value: 1900 }, { name: 'Accessories', value: 1400 },
];
const COLORS = ['#000', '#555', '#999', '#bbb'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-sm text-gray-500">Full view of your store performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$43,290', change: '+12%' },
          { label: 'Avg Order Value', value: '$84.50', change: '+5%' },
          { label: 'Refund Rate', value: '3.2%', change: '-0.4%' },
          { label: 'Customer LTV', value: '$310', change: '+8%' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 font-medium">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{kpi.change} this month</p>
          </div>
        ))}
      </div>

      {/* Sales vs Returns Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Monthly Sales vs Returns</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v) => `$${v}`} />
              <Bar dataKey="sales" fill="#000" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returns" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Pie */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Sales by Category</h2>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `$${v}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
