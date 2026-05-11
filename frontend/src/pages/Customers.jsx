import { Search, UserPlus, Mail, Edit2 } from 'lucide-react';

const mockCustomers = [
  { id: '#CUS-1029', name: 'Alex Johnson', email: 'alex.j@example.com', spent: '$1,249.00', orders: 12, status: 'Active' },
  { id: '#CUS-1028', name: 'Sarah Williams', email: 'sarah.w@example.com', spent: '$899.00', orders: 3, status: 'Active' },
  { id: '#CUS-1027', name: 'Michael Chen', email: 'm.chen@example.com', spent: '$45.00', orders: 1, status: 'Inactive' },
  { id: '#CUS-1026', name: 'Emily Davis', email: 'emily.d@example.com', spent: '$2,299.00', orders: 24, status: 'VIP' },
  { id: '#CUS-1025', name: 'David Smith', email: 'd.smith@example.com', spent: '$120.00', orders: 2, status: 'Active' },
];

const Customers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500">Manage customer profiles, purchase history, and analytics.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          <UserPlus size={18} />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers by name or email..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Customer ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-black">{customer.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{customer.name}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={12}/> {customer.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{customer.spent}</td>
                  <td className="px-6 py-4 text-gray-500">{customer.orders}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' :
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-black transition-colors">
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
