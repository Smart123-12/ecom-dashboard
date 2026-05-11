import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your store preferences and configurations.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">General Information</h2>
          <p className="text-sm text-gray-500 mt-1">Update your store name and contact details.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" defaultValue="eCommerce Premium" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
            <textarea rows="4" defaultValue="Premium goods for the modern professional." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm"></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Payment Gateways</h2>
          <p className="text-sm text-gray-500 mt-1">Configure your Stripe and PayPal integrations.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
              <div>
                <p className="font-medium text-gray-900">Stripe Integration</p>
                <p className="text-sm text-green-600 font-medium">Connected</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Manage</button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00457C] rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
              <div>
                <p className="font-medium text-gray-900">PayPal Express</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">Connect</button>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
