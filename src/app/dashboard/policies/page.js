"use client";

import { useState, useEffect } from "react";
import * as actions from "@/app/actions";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    title: "", 
    domain: "Education", 
    severity: "Medium",
    status: "Review"
  });

  const loadPolicies = async () => {
    setLoading(true);
    try {
      const data = await actions.fetchPolicies();
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.createPolicy(formData);
      setFormData({ title: "", domain: "Education", severity: "Medium", status: "Review" });
      await loadPolicies();
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  const togglePolicyStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Enforced' ? 'Review' : 'Enforced';
    try {
      await actions.updatePolicy(id, { status: newStatus });
      await loadPolicies();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deletePolicy = async (id) => {
    try {
      await actions.deletePolicy(id);
      await loadPolicies();
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Policy Engine</h1>
        <p className="text-xl text-zinc-500 font-bold tracking-tight max-w-2xl">Define and enforce global directives across NexusCore domains. Protocol integrity is mandatory.</p>
      </div>

      {/* Enhanced Draft Form */}
      <section className="glass-card p-12 neon-border">
        <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
          <span className="h-10 w-2 bg-amber-600 rounded-full shadow-[0_0_15px_#39ff14]" />
          Draft New Directive
        </h3>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Directive Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="cyber-input w-full"
                placeholder="e.g. Nutrient Rationing Protocol"
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Target Domain</label>
                <select 
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  className="cyber-input w-full appearance-none cursor-pointer"
                >
                  {['Harvesting', 'Pulse', 'Telecom', 'Education', 'Archive'].map(d => (
                    <option key={d} value={d} className="bg-zinc-900">{d.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Severity Level</label>
                <select 
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="cyber-input w-full appearance-none cursor-pointer"
                >
                  {['Low', 'Medium', 'High', 'Critical'].map(s => (
                    <option key={s} value={s} className="bg-zinc-900">{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary px-16 h-[62px]">
              PUBLISH DIRECTIVE TO CLUSTER
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </section>

      {/* Registry Table */}
      <section className="glass-card overflow-hidden neon-border">
        <div className="p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h3 className="text-xl font-black text-white tracking-tight uppercase">Global Enforcement Registry</h3>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{policies.length} Active Directives</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] border-b border-white/5 bg-black/20">
                <th className="py-8 px-12">Directive ID</th>
                <th className="py-8 px-8">Descriptor & Domain</th>
                <th className="py-8 px-8">Timestamp</th>
                <th className="py-8 px-8">Severity</th>
                <th className="py-8 px-8 text-center">Status</th>
                <th className="py-8 px-12 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center text-zinc-600 font-bold italic tracking-widest animate-pulse uppercase">Syncing with Directive Registry...</td>
                </tr>
              ) : policies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center text-zinc-600 font-bold italic tracking-widest uppercase">No active directives detected.</td>
                </tr>
              ) : policies.map((p) => (
                <tr key={p._id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-10 px-12 font-mono text-xs font-black text-zinc-600 truncate max-w-[120px] group-hover:text-zinc-400 transition-colors">{p._id}</td>
                  <td className="py-10 px-8">
                    <p className="font-black text-white text-lg tracking-tight">{p.title}</p>
                    <span className="px-3 py-1 bg-amber-600/10 text-amber-600 rounded-md text-[9px] font-black uppercase tracking-[0.2em] border border-amber-600/20 mt-2 inline-block">{p.domain}</span>
                  </td>
                  <td className="py-10 px-8 text-zinc-500 font-bold text-xs font-mono">
                    {new Date(p.created_at).toLocaleString()}
                  </td>
                  <td className="py-10 px-8">
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${
                      p.severity === "Critical" ? "text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : p.severity === "High" ? "text-orange-500" : "text-zinc-500"
                    }`}>
                      {p.severity}
                    </span>
                  </td>
                  <td className="py-10 px-8 text-center">
                    <button 
                      onClick={() => togglePolicyStatus(p._id, p.status)}
                      className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                        p.status === "Enforced" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-10 px-12 text-right">
                    <button 
                      onClick={() => deletePolicy(p._id)}
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
