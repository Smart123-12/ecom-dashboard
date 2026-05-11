import { useState } from 'react';
import { Plus, Trash2, X, Tag, Copy, CheckCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { useToastStore } from '../lib/store';

const INIT = [
  { id: 1, code: 'SAVE10',   type: 'percent', value: 10,   minOrder: 50,  uses: 234,  maxUses: 500,  active: true,  expires: '2024-12-31' },
  { id: 2, code: 'FLAT50',   type: 'flat',    value: 50,   minOrder: 200, uses: 89,   maxUses: 200,  active: true,  expires: '2024-11-30' },
  { id: 3, code: 'SHOPEX',   type: 'percent', value: 15,   minOrder: 100, uses: 412,  maxUses: 1000, active: true,  expires: '2024-12-15' },
  { id: 4, code: 'WELCOME20',type: 'percent', value: 20,   minOrder: 0,   uses: 1203, maxUses: 5000, active: false, expires: '2024-06-30' },
  { id: 5, code: 'FREESHIP', type: 'flat',    value: 5.99, minOrder: 30,  uses: 678,  maxUses: 2000, active: true,  expires: '2024-12-31' },
];

export default function Coupons() {
  const [coupons, setCoupons] = useState(INIT);
  const [showAdd, setShowAdd] = useState(false);
  const [copied, setCopied] = useState('');
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', minOrder: 0, maxUses: 100, expires: '' });
  const addToast = useToastStore((s) => s.addToast);

  const toggle = (id) => { const c = coupons.find(x=>x.id===id); setCoupons(cs=>cs.map(x=>x.id===id?{...x,active:!x.active}:x)); addToast(`"${c.code}" ${c.active?'deactivated':'activated'}`, c.active?'info':'success'); };
  const remove = (id, code) => { setCoupons(cs=>cs.filter(c=>c.id!==id)); addToast(`"${code}" deleted.`,'info'); };
  const copy = (code) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(()=>setCopied(''),1500); addToast(`Copied: ${code}`,'success'); };

  const save = (e) => {
    e.preventDefault();
    const newC = { ...form, id: Date.now(), value: Number(form.value), minOrder: Number(form.minOrder), maxUses: Number(form.maxUses), uses: 0, active: true };
    setCoupons(cs => [newC, ...cs]);
    addToast(`Coupon "${form.code}" created! 🎉`, 'success');
    setShowAdd(false);
    setForm({ code: '', type: 'percent', value: '', minOrder: 0, maxUses: 100, expires: '' });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Coupons</h1>
          <p className="text-sm text-gray-500">{coupons.filter(c=>c.active).length} active · {coupons.length} total</p></div>
        <button onClick={()=>setShowAdd(true)} className="flex items-center gap-2 bg-[#2874F0] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200">
          <Plus size={18}/> Create Coupon</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{l:'Total',v:coupons.length},{l:'Active',v:coupons.filter(c=>c.active).length},{l:'Total Uses',v:coupons.reduce((s,c)=>s+c.uses,0).toLocaleString()},{l:'Savings Given',v:'$4,280'}].map(s=>(
          <div key={s.l} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="text-2xl font-extrabold text-[#2874F0]">{s.v}</div><div className="text-xs text-gray-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold uppercase text-gray-500 border-b border-gray-200 dark:border-gray-600">
              <tr>{['Code','Discount','Min Order','Uses','Expires','Status','Actions'].map(h=><th key={h} className="px-5 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {coupons.map(c=>(
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Tag size={13} className="text-[#2874F0]"/>
                      <span className="font-mono font-extrabold text-gray-900 dark:text-white">{c.code}</span>
                      <button onClick={()=>copy(c.code)} className="text-gray-300 hover:text-gray-600">
                        {copied===c.code?<CheckCheck size={12} className="text-green-500"/>:<Copy size={12}/>}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-bold text-gray-900 dark:text-white">{c.type==='percent'?`${c.value}% OFF`:`$${c.value} OFF`}</td>
                  <td className="px-5 py-3 text-gray-500">${c.minOrder}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-[#2874F0] rounded-full" style={{width:`${Math.min(100,(c.uses/c.maxUses)*100)}%`}}/></div>
                      <span className="text-xs text-gray-500">{c.uses}/{c.maxUses}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{c.expires}</td>
                  <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${c.active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{c.active?'Active':'Inactive'}</span></td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={()=>toggle(c.id)}>{c.active?<ToggleRight size={20} className="text-green-500"/>:<ToggleLeft size={20} className="text-gray-400"/>}</button>
                      <button onClick={()=>remove(c.id,c.code)} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-extrabold text-gray-900 dark:text-white">Create Coupon</h3>
              <button onClick={()=>setShowAdd(false)}><X size={20} className="text-gray-400"/></button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Code *</label>
                <input name="code" required value={form.code} onChange={e=>setForm({...form,code:e.target.value.toUpperCase()})} placeholder="e.g. SUMMER20"
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono font-bold uppercase outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Type</label>
                  <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <option value="percent">% Percent</option><option value="flat">$ Flat</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Value *</label>
                  <input type="number" min="0" required value={form.value} onChange={e=>setForm({...form,value:e.target.value})} placeholder="10"
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600"/>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Min Order ($)</label>
                  <input type="number" min="0" value={form.minOrder} onChange={e=>setForm({...form,minOrder:e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600"/>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Max Uses</label>
                  <input type="number" min="1" value={form.maxUses} onChange={e=>setForm({...form,maxUses:e.target.value})}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600"/>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Expiry Date</label>
                <input type="date" value={form.expires} onChange={e=>setForm({...form,expires:e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2874F0] dark:bg-gray-700 dark:text-white dark:border-gray-600"/>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowAdd(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#2874F0] text-white rounded-xl font-bold text-sm hover:bg-blue-700">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
