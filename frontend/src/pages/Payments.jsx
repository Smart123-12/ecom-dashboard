import { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useToastStore } from '../lib/store';

const gateways = [
  {
    id: 'stripe', name: 'Stripe', logo: '💳', color: '#635BFF',
    description: 'Accept cards, Apple Pay, Google Pay worldwide.', connected: true,
  },
  {
    id: 'razorpay', name: 'Razorpay', logo: '₹', color: '#3395FF',
    description: 'Best payment gateway for India (UPI, NetBanking, Wallets).', connected: false,
  },
  {
    id: 'paypal', name: 'PayPal', logo: 'P', color: '#003087',
    description: 'Let customers pay via PayPal balance or cards globally.', connected: false,
  },
];

const transactions = [
  { id: 'TXN-001', amount: '$299.00', gateway: 'Stripe', status: 'Success', date: 'May 10, 2024' },
  { id: 'TXN-002', amount: '$49.00', gateway: 'Razorpay', status: 'Pending', date: 'May 09, 2024' },
  { id: 'TXN-003', amount: '$899.00', gateway: 'Stripe', status: 'Success', date: 'May 08, 2024' },
  { id: 'TXN-004', amount: '$199.00', gateway: 'PayPal', status: 'Failed', date: 'May 07, 2024' },
  { id: 'TXN-005', amount: '$1,249.00', gateway: 'Stripe', status: 'Refunded', date: 'May 06, 2024' },
];

const Payments = () => {
  const [gw, setGw] = useState(gateways);
  const addToast = useToastStore((s) => s.addToast);

  const toggle = (id) => {
    setGw((prev) => prev.map((g) => g.id === id ? { ...g, connected: !g.connected } : g));
    const gateway = gw.find((g) => g.id === id);
    addToast(`${gateway.name} ${gateway.connected ? 'disconnected' : 'connected'} successfully!`, gateway.connected ? 'info' : 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Payment Integration</h1>
        <p className="text-sm text-gray-500">Manage Stripe, Razorpay and PayPal gateways.</p>
      </div>

      {/* Gateways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gw.map((g) => (
          <div key={g.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: g.color }}>
                {g.logo}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{g.name}</p>
                <p className={`text-xs font-medium ${g.connected ? 'text-green-600' : 'text-gray-400'}`}>
                  {g.connected ? '● Connected' : '○ Not connected'}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{g.description}</p>
            <button
              onClick={() => toggle(g.id)}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                g.connected ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-black text-white hover:bg-gray-800'
              }`}>
              {g.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <CreditCard size={18} className="text-gray-600 dark:text-gray-300" />
          <h2 className="font-bold text-gray-900 dark:text-white">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
              <tr>
                {['Transaction ID', 'Amount', 'Gateway', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3 font-mono font-medium text-gray-900 dark:text-white">{t.id}</td>
                  <td className="px-5 py-3 font-medium">{t.amount}</td>
                  <td className="px-5 py-3 text-gray-500">{t.gateway}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.status === 'Success'  ? 'bg-green-100 text-green-700' :
                      t.status === 'Pending'  ? 'bg-yellow-100 text-yellow-700' :
                      t.status === 'Refunded' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
