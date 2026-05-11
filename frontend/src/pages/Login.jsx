import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag, Copy, CheckCheck } from 'lucide-react';
import { useAuthStore, useToastStore } from '../lib/store';

const DEMO_CREDS = [
  { role: 'Admin', email: 'admin@demo.com', password: 'Admin@123', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { role: 'User',  email: 'user@demo.com',  password: 'User@123',  color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { role: 'Seller', email: 'seller@demo.com', password: 'Seller@123', color: 'bg-green-100 border-green-300 text-green-800' },
];

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const { login } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (result.success) {
        addToast(`Welcome back, ${result.user.name}! 👋`, 'success');
        if (result.user.role === 'ADMIN') navigate('/admin');
        else if (result.user.role === 'SELLER') navigate('/seller');
        else navigate('/');
      } else {
        setError(result.message);
      }
    }, 800);
  };

  const fillCreds = (cred) => {
    setForm({ email: cred.email, password: cred.password });
    setError('');
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2874F0] via-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Brand */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBag size={22} className="text-[#2874F0]" />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">ShopEx</span>
          </Link>
          <p className="text-blue-200 text-sm mt-1">India's favourite eCommerce platform</p>
        </div>

        {/* Demo Credentials Banner */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3 text-center">🔑 Demo Accounts</p>
          <div className="space-y-2">
            {DEMO_CREDS.map((c) => (
              <div key={c.role} className={`flex items-center justify-between px-3 py-2 rounded-xl border ${c.color} cursor-pointer hover:opacity-90`}
                onClick={() => fillCreds(c)}>
                <div>
                  <span className="text-xs font-bold">{c.role}: </span>
                  <span className="text-xs font-mono">{c.email}</span>
                  <span className="text-xs"> / </span>
                  <span className="text-xs font-mono font-bold">{c.password}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={(e) => { e.stopPropagation(); copyText(c.email + ':' + c.password, c.role); }}
                    className="p-1 rounded hover:bg-black/10">
                    {copied === c.role ? <CheckCheck size={13} /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-xs text-center mt-2">Click any row to auto-fill ↑</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your credentials to continue</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2874F0] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm"
                placeholder="Enter your email" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#2874F0] font-semibold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#2874F0] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm"
                  placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-[#2874F0] cursor-pointer" />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember me for 30 days</label>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#2874F0] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Don't have an account?{' '}
              <Link to="/register" className="text-[#2874F0] font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
