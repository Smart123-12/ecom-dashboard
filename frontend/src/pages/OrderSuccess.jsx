import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Package } from 'lucide-react';

const OrderSuccess = () => {
  const { state } = useLocation();
  const { orderId = '#ORD-XXXX', total = 0, payment = 'Stripe' } = state || {};

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={44} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed! 🎉</h1>
        <p className="text-gray-500 mb-6">Your order has been placed successfully and is being processed.</p>

        <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3 text-sm text-left">
          <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span className="font-extrabold text-[#2874F0]">{orderId}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Amount Paid</span><span className="font-extrabold text-gray-900">${Number(total).toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Payment Via</span><span className="font-semibold text-gray-700">{payment}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold">Processing</span></div>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center justify-center gap-2 bg-[#2874F0] text-white py-3 rounded-xl font-extrabold hover:bg-blue-700 transition-colors">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
          <Link to="/admin/orders" className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm">
            <Package size={16} /> Track Order in Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
