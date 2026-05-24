"use client";

import { useState, useEffect } from "react";
import * as actions from "@/app/actions";

export default function CensusPage() {
  const [survivors, setSurvivors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    identity_code: "",
    full_name: "",
    duty: "",
    clearance: "ALPHA",
    status: "Active"
  });

  const loadSurvivors = async () => {
    setLoading(true);
    const data = await actions.fetchSurvivors();
    setSurvivors(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSurvivors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await actions.createSurvivor(formData);
    if (res.success) {
      setFormData({ 
        identity_code: "",
        full_name: "",
        duty: "",
        clearance: "ALPHA", 
        status: "Active" 
      });
      await loadSurvivors();
    } else {
      alert(`Access Denied: ${res.error}`);
    }
  };

  const toggleSurvivorStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Quarantine' : 'Active';
    const res = await actions.updateSurvivor(id, { status: newStatus });
    if (res.success) {
      await loadSurvivors();
    } else {
      alert(`Update Failed: ${res.error}`);
    }
  };

  const deleteSurvivor = async (id) => {
    const res = await actions.deleteSurvivor(id);
    if (res.success) {
      await loadSurvivors();
    } else {
      alert(`Purge Failed: ${res.error}`);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Survivor Census</h1>
        <p className="text-xl text-slate-500 font-medium italic">Population registry and biological status monitoring.</p>
      </div>

      {/* Register Form */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <span className="h-8 w-1.5 bg-blue-600 rounded-full" />
          Register New Node
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Identity Code</label>
            <input 
              type="text" 
              required
              value={formData.identity_code}
              onChange={(e) => setFormData({...formData, identity_code: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. NODE-001"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
              placeholder="Survivor Name..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Assigned Duty</label>
            <input 
              type="text" 
              required
              value={formData.duty}
              onChange={(e) => setFormData({...formData, duty: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Engineering"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Clearance</label>
            <select 
              value={formData.clearance}
              onChange={(e) => setFormData({...formData, clearance: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 outline-none cursor-pointer appearance-none"
            >
              {['ALPHA', 'BETA', 'GAMMA', 'OMEGA'].map(lvl => (
                <option key={lvl} value={lvl}>{lvl} Protocol</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
              Process Entry
            </button>
          </div>
        </form>
      </section>

      {/* Registry Table */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Survivor Registry</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{survivors.length} Active Nodes</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="py-6 px-10">Node ID</th>
                <th className="py-6 px-6">Identity</th>
                <th className="py-6 px-6">Duty</th>
                <th className="py-6 px-6">Clearance</th>
                <th className="py-6 px-6 text-center">Status</th>
                <th className="py-6 px-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-slate-400 font-bold italic">Synchronizing with Atlas Node Registry...</td>
                </tr>
              ) : survivors.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-8 px-10 font-mono text-sm font-black text-blue-600 uppercase tracking-tighter">
                    {s.identity_code}
                  </td>
                  <td className="py-8 px-6">
                    <p className="font-bold text-slate-800 text-lg">{s.full_name}</p>
                    <p className="text-[10px] text-slate-400 font-medium italic">{new Date(s.created_at).toLocaleString()}</p>
                  </td>
                  <td className="py-8 px-6 text-slate-500 font-bold uppercase text-xs tracking-wider">
                    {s.duty}
                  </td>
                  <td className="py-8 px-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                      {s.clearance}
                    </span>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <button 
                      onClick={() => toggleSurvivorStatus(s._id, s.status)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all border-2 ${
                        s.status === "Active" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" 
                          : "bg-red-50 text-red-700 border-red-100 hover:bg-red-100 animate-pulse"
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <button 
                      onClick={() => deleteSurvivor(s._id)}
                      className="p-2 text-slate-300 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
