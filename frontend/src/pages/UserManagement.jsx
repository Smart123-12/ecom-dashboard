import { useState } from 'react';
import { Search, UserCheck, UserX, Shield, Eye, X, Users } from 'lucide-react';
import { useToastStore } from '../lib/store';

const INIT_USERS = [
  { id: 1, name: 'Admin Manager', email: 'admin@demo.com', role: 'ADMIN', status: 'Active', joined: 'Jan 01, 2024', orders: 0, spent: '$0' },
  { id: 2, name: 'John Customer', email: 'user@demo.com', role: 'USER', status: 'Active', joined: 'Feb 14, 2024', orders: 12, spent: '$1,248' },
  { id: 3, name: 'Rahul Seller', email: 'seller@demo.com', role: 'SELLER', status: 'Active', joined: 'Mar 05, 2024', orders: 0, spent: '$0' },
  { id: 4, name: 'Priya Mehta', email: 'priya@example.com', role: 'USER', status: 'Active', joined: 'Apr 10, 2024', orders: 5, spent: '$672' },
  { id: 5, name: 'Karan Desai', email: 'karan@example.com', role: 'USER', status: 'Suspended', joined: 'May 02, 2024', orders: 2, spent: '$98' },
  { id: 6, name: 'Sneha Joshi', email: 'sneha@example.com', role: 'SELLER', status: 'Active', joined: 'Mar 20, 2024', orders: 0, spent: '$0' },
];

const ROLES = ['USER', 'SELLER', 'ADMIN'];
const ROLE_COLOR = { ADMIN: 'bg-purple-100 text-purple-700', SELLER: 'bg-blue-100 text-blue-700', USER: 'bg-gray-100 text-gray-600' };
const STATUS_COLOR = { Active: 'bg-green-100 text-green-700', Suspended: 'bg-red-100 text-red-700' };

export default function UserManagement() {
  const [users, setUsers] = useState(INIT_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [view, setView] = useState(null);
  const addToast = useToastStore((s) => s.addToast);

  const filtered = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'All' || u.role === roleFilter)
  );

  const toggleStatus = (id) => {
    const u = users.find(x => x.id === id);
    setUsers(us => us.map(x => x.id === id ? { ...x, status: x.status === 'Active' ? 'Suspended' : 'Active' } : x));
    if (view?.id === id) setView(v => ({ ...v, status: v.status === 'Active' ? 'Suspended' : 'Active' }));
    addToast(`${u.name} ${u.status === 'Active' ? 'suspended' : 'reactivated'}.`, u.status === 'Active' ? 'info' : 'success');
  };

  const changeRole = (id, role) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, role } : u));
    if (view?.id === id) setView(v => ({ ...v, role }));
    addToast(`Role updated to ${role}`, 'success');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-500">{users.length} total users · {users.filter(u=>u.status==='Suspended').length} suspended</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[{l:'Total Users',v:users.length,icon:Users},{l:'Active',v:users.filter(u=>u.status==='Active').length,icon:UserCheck},{l:'Suspended',v:users.filter(u=>u.status==='Suspended').length,icon:UserX}].map(s=>(
          <div key={s.l} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-3">
            <s.icon size={20} className="text-[#2874F0]"/>
            <div><p className="text-xl font-extrabold text-gray-900 dark:text-white">{s.v}</p><p className="text-xs text-gray-500">{s.l}</p></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        </div>
        <div className="flex gap-2">
          {['All',...ROLES].map(r=>(
            <button key={r} onClick={()=>setRoleFilter(r)}
              className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-colors ${roleFilter===r?'bg-[#2874F0] text-white border-[#2874F0]':'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200 dark:border-gray-600">
              <tr>{['User','Role','Status','Joined','Orders','Actions'].map(h=><th key={h} className="px-5 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map(u=>(
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2874F0] to-blue-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <select value={u.role} onChange={e=>changeRole(u.id,e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${ROLE_COLOR[u.role]}`}>
                      {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[u.status]}`}>{u.status}</span></td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{u.joined}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">{u.orders}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={()=>setView(u)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={14}/></button>
                      <button onClick={()=>toggleStatus(u.id)} className={`p-2 rounded-lg ${u.status==='Active'?'text-gray-400 hover:text-red-500 hover:bg-red-50':'text-gray-400 hover:text-green-600 hover:bg-green-50'}`}>
                        {u.status==='Active'?<UserX size={14}/>:<UserCheck size={14}/>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0&&<tr><td colSpan={6} className="py-12 text-center text-gray-400">No users found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Modal */}
      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-extrabold text-gray-900 dark:text-white">User Profile</h3>
              <button onClick={()=>setView(null)}><X size={20} className="text-gray-400"/></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2874F0] to-blue-400 flex items-center justify-center text-white text-2xl font-bold">
                  {view.name[0]}
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 dark:text-white text-lg">{view.name}</p>
                  <p className="text-sm text-gray-500">{view.email}</p>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${ROLE_COLOR[view.role]}`}>{view.role}</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-gray-500 text-xs">Status</p><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[view.status]}`}>{view.status}</span></div>
                <div><p className="text-gray-500 text-xs">Joined</p><p className="font-semibold text-gray-900 dark:text-white">{view.joined}</p></div>
                <div><p className="text-gray-500 text-xs">Orders</p><p className="font-semibold text-gray-900 dark:text-white">{view.orders}</p></div>
                <div><p className="text-gray-500 text-xs">Total Spent</p><p className="font-semibold text-gray-900 dark:text-white">{view.spent}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>toggleStatus(view.id)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm ${view.status==='Active'?'bg-red-50 text-red-600 hover:bg-red-100':'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                  {view.status==='Active'?'Suspend User':'Reactivate'}
                </button>
                <button onClick={()=>setView(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
