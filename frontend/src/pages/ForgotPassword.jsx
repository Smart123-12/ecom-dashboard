import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <Link to="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>

        {!sent ? (
          <>
            <div className="mx-auto w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
              <Mail size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Forgot password?</h2>
            <p className="mt-2 text-sm text-gray-600 mb-6">Enter your registered email and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm"
                  placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={26} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Check your inbox</h3>
            <p className="text-sm text-gray-500 mt-2">We sent a password reset link to <span className="font-medium text-black">{email}</span></p>
            <Link to="/login" className="mt-6 inline-block text-sm font-medium text-black hover:underline">Back to login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
