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
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Survivor Census</h1>
        <p className="text-xl text-zinc-500 font-bold tracking-tight max-w-2xl">Live registry of all verified biological nodes within the Nexus ecosystem. Enforce protocols via the status override.</p>
      </div>

      {/* Register Form */}
      <section className="glass-card p-12 neon-border">
        <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
          <span className="h-10 w-2 bg-amber-600 rounded-full shadow-[0_0_15px_#39ff14]" />
          Initialize New Node
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Node Reference</label>
            <input 
              type="text" 
              required
              value={formData.identity_code}
              onChange={(e) => setFormData({...formData, identity_code: e.target.value})}
              className="cyber-input w-full"
              placeholder="e.g. NODE-042"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Identity Descriptor</label>
            <input 
              type="text" 
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="cyber-input w-full"
              placeholder="Full Name..."
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Assigned Sector</label>
            <input 
              type="text" 
              required
              value={formData.duty}
              onChange={(e) => setFormData({...formData, duty: e.target.value})}
              className="cyber-input w-full"
              placeholder="e.g. Cybernetics"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Access Level</label>
            <select 
              value={formData.clearance}
              onChange={(e) => setFormData({...formData, clearance: e.target.value})}
              className="cyber-input w-full appearance-none cursor-pointer"
            >
              {['ALPHA', 'BETA', 'GAMMA', 'OMEGA'].map(lvl => (
                <option key={lvl} value={lvl} className="bg-zinc-900">{lvl} PROTOCOL</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full h-[62px]">
              PROCESS ENTRY
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </section>

      {/* Registry Table */}
      <section className="glass-card overflow-hidden neon-border">
        <div className="p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h3 className="text-xl font-black text-white tracking-tight uppercase">Population Registry</h3>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{survivors.length} Verified Nodes</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] border-b border-white/5 bg-black/20">
                <th className="py-8 px-12">Reference</th>
                <th className="py-8 px-8">Identity</th>
                <th className="py-8 px-8">Sector</th>
                <th className="py-8 px-8">Access</th>
                <th className="py-8 px-8 text-center">Status</th>
                <th className="py-8 px-12 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center text-zinc-600 font-bold italic tracking-widest animate-pulse uppercase">Syncing with Node Registry...</td>
                </tr>
              ) : survivors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center text-zinc-600 font-bold italic tracking-widest uppercase">No nodes found in local cluster.</td>
                </tr>
              ) : survivors.map((s) => (
                <tr key={s._id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-10 px-12 font-mono text-sm font-black text-amber-600 uppercase tracking-tighter">
                    {s.identity_code}
                  </td>
                  <td className="py-10 px-8">
                    <p className="font-black text-white text-lg tracking-tight">{s.full_name}</p>
                    <p className="text-[10px] text-zinc-500 font-bold mt-1 font-mono">{new Date(s.created_at).toLocaleString()}</p>
                  </td>
                  <td className="py-10 px-8 text-zinc-400 font-black uppercase text-xs tracking-widest">
                    {s.duty}
                  </td>
                  <td className="py-10 px-8">
                    <span className="px-4 py-1.5 bg-zinc-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 group-hover:border-amber-600/30 transition-all">
                      {s.clearance}
                    </span>
                  </td>
                  <td className="py-10 px-8 text-center">
                    <button 
                      onClick={() => toggleSurvivorStatus(s._id, s.status)}
                      className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                        s.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                          : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 animate-pulse"
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                  <td className="py-10 px-12 text-right">
                    <button 
                      onClick={() => deleteSurvivor(s._id)}
                      className="p-3 text-zinc-600 hover:text-white transition-all rounded-2xl hover:bg-white/10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
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
