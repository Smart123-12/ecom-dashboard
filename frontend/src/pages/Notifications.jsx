import { Bell, Package, ShoppingBag, Users, AlertTriangle, Check } from 'lucide-react';
import { useState } from 'react';

const allNotifications = [
  { id: 1, icon: ShoppingBag, title: 'New order received', desc: 'Order #ORD-7352 from Alex Johnson — $149.00', time: '2 min ago', read: false, type: 'order' },
  { id: 2, icon: AlertTriangle, title: 'Low inventory alert', desc: 'Minimalist Leather Watch has only 3 units left.', time: '15 min ago', read: false, type: 'alert' },
  { id: 3, icon: Users, title: 'New customer signed up', desc: 'Sarah Williams created an account.', time: '1 hr ago', read: false, type: 'customer' },
  { id: 4, icon: Package, title: 'Order shipped', desc: 'Order #ORD-7349 has been marked as shipped.', time: '3 hr ago', read: true, type: 'order' },
  { id: 5, icon: ShoppingBag, title: 'Payment failed', desc: 'Order #ORD-7348 payment failed via PayPal.', time: '5 hr ago', read: true, type: 'alert' },
  { id: 6, icon: Check, title: 'Order delivered', desc: 'Order #ORD-7340 was delivered successfully.', time: 'Yesterday', read: true, type: 'order' },
];

const iconColors = { order: 'bg-blue-100 text-blue-600', alert: 'bg-red-100 text-red-600', customer: 'bg-green-100 text-green-600' };

const Notifications = () => {
  const [notifs, setNotifs] = useState(allNotifications);
  const markAll = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-gray-500">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="text-sm font-medium text-black dark:text-white hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {notifs.map((n, i) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
              className={`flex items-start gap-4 p-5 cursor-pointer transition-colors ${
                !n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
              } ${i > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColors[n.type]}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{n.title}</p>
                <p className="text-sm text-gray-500 mt-0.5 truncate">{n.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-xs text-gray-400">{n.time}</span>
                {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
