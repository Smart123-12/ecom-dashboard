import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('Passwords do not match');
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); setTimeout(() => navigate('/login'), 2000); }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mx-auto w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
          <Lock size={22} className="text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900">Set new password</h2>
        <p className="mt-2 text-sm text-gray-600 mb-6">Your new password must be at least 8 characters.</p>
        {!done ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} required minLength={8}
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70">
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-green-600 font-semibold text-lg">✓ Password updated!</p>
            <p className="text-sm text-gray-500 mt-1">Redirecting you to login...</p>
          </div>
        )}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-black">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
