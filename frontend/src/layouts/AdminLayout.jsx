import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Package, Users, Settings,
  LogOut, Menu, X, Bell, Sun, Moon, TrendingUp, CreditCard, BarChart2, Tag, UserCog, Home
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useThemeStore, useAuthStore } from '../lib/store';
import { Toaster } from '../components/ui/Toaster';

const navItems = [
  { name: 'Dashboard',      path: '/admin',               icon: LayoutDashboard },
  { name: 'Analytics',      path: '/admin/analytics',     icon: BarChart2 },
  { name: 'Orders',         path: '/admin/orders',         icon: ShoppingBag },
  { name: 'Products',       path: '/admin/products',       icon: Package },
  { name: 'Customers',      path: '/admin/customers',      icon: Users },
  { name: 'Payments',       path: '/admin/payments',       icon: CreditCard },
  { name: 'Coupons',        path: '/admin/coupons',        icon: Tag },
  { name: 'User Mgmt',      path: '/admin/users',          icon: UserCog },
  { name: 'Notifications',  path: '/admin/notifications',  icon: Bell },
  { name: 'Settings',       path: '/admin/settings',       icon: Settings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700">
        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white dark:text-black font-bold text-lg">E</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">eCommerce</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={name} to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}>
              <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full rounded-lg text-sm font-medium transition-colors">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors`}>

      {/* Sidebar — Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full z-10">
        <SidebarContent />
      </aside>

      {/* Sidebar — Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <Menu size={22} />
          </button>
          <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
            Welcome back, <span className="font-semibold text-gray-900 dark:text-white">{user?.name || 'Admin'}</span> 👋
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {/* Dark mode */}
            <button onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Notifications */}
            <Link to="/admin/notifications"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Global Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default AdminLayout;
