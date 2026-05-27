"use client";

import { useState } from "react";
import { useBunker } from "@/context/BunkerContext";

export default function PoliciesPage() {
  const { policies, loading, addPolicy, togglePolicyStatus, updatePolicy, deletePolicy } = useBunker();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    domain: "Education", 
    severity: "Medium",
    description: "",
    status: "Review"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPolicy(formData);
    setFormData({ title: "", domain: "Education", severity: "Medium", description: "", status: "Review" });
  };

  const handleEditClick = (policy) => {
    setSelectedPolicy(policy);
    setEditBuffer({ ...policy });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedPolicy || !editBuffer) return;
    try {
      const res = await updatePolicy(selectedPolicy._id, editBuffer);
      if (res?.success) {
        setSelectedPolicy(null);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Save Policy Error:", err);
    }
  };

  const handleToggle = async (id, e) => {
    e.stopPropagation();
    await togglePolicyStatus(id);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (confirm("DIRECTIVE PURGE INITIATED. CONFIRM?")) {
      await deletePolicy(id);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Policy Engine</h1>
        <p className="text-sm text-zinc-500 font-bold tracking-tight max-w-xl italic opacity-80">Define and enforce global directives across NexusCore sectors.</p>
      </div>

      {/* Draft Form */}
      <section className="glass-card p-8 bg-zinc-900/10">
        <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest italic opacity-90">
          <span className="h-6 w-1 bg-amber-600/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
          Draft New Directive
        </h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Directive Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="cyber-input w-full bg-zinc-950/50"
                placeholder="e.g. Nutrient Rationing Protocol"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Target Sector</label>
                <select 
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  className="cyber-input w-full appearance-none cursor-pointer bg-zinc-950/50"
                >
                  {['Harvesting', 'Pulse', 'Telecom', 'Education', 'Archive'].map(d => (
                    <option key={d} value={d} className="bg-zinc-900">{d.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Severity</label>
                <select 
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="cyber-input w-full appearance-none cursor-pointer bg-zinc-950/50"
                >
                  {['Low', 'Medium', 'High', 'Critical'].map(s => (
                    <option key={s} value={s} className="bg-zinc-900">{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Directive Parameters</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="cyber-input w-full h-24 resize-none bg-zinc-950/50"
              placeholder="Detail protocol constraints..."
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn-primary px-10 h-14 bg-amber-600/80 hover:bg-amber-600">
              PUBLISH DIRECTIVE
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </section>

      {/* Registry Table */}
      <section className="glass-card overflow-hidden bg-zinc-900/10">
        <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/30">
          <h3 className="text-lg font-black text-white tracking-tighter uppercase italic opacity-90">Enforcement Registry</h3>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600/60 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{policies.length} Active Directives</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] border-b border-zinc-900 bg-zinc-950/50">
                <th className="py-6 px-10">Identifier</th>
                <th className="py-6 px-6">Descriptor & Sector</th>
                <th className="py-6 px-6">Severity</th>
                <th className="py-6 px-6 text-center">Status</th>
                <th className="py-6 px-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-24 text-center text-zinc-700 font-bold italic tracking-widest animate-pulse uppercase text-xs">Syncing with Relay...</td>
                </tr>
              ) : policies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-24 text-center text-zinc-800 font-bold italic tracking-widest uppercase text-xs">No directives active.</td>
                </tr>
              ) : policies.map((p) => (
                <tr 
                  key={p._id} 
                  onClick={() => handleEditClick(p)}
                  className="hover:bg-amber-600/[0.01] transition-colors group cursor-pointer"
                >
                  <td className="py-8 px-10 font-mono text-[10px] font-black text-zinc-700 truncate max-w-[120px] group-hover:text-zinc-500 transition-colors uppercase italic">{p._id.slice(-8)}</td>
                  <td className="py-8 px-6">
                    <p className="font-black text-white text-base tracking-tighter uppercase leading-tight">{p.title}</p>
                    <span className="text-[8px] font-black text-amber-700/60 uppercase tracking-[0.2em] mt-1 inline-block italic">{p.domain}</span>
                  </td>
                  <td className="py-8 px-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      p.severity === "Critical" ? "text-red-500/80" : p.severity === "High" ? "text-amber-600/80" : "text-zinc-600"
                    }`}>
                      {p.severity}
                    </span>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <button 
                      onClick={(e) => handleToggle(p._id, e)}
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                        p.status === "Enforced" 
                          ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10" 
                          : "bg-amber-500/5 text-amber-600 border-amber-500/20 hover:bg-amber-500/10"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditClick(p); }}
                        className="p-2.5 text-zinc-700 hover:text-amber-600 transition-all rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                      </button>
                      <button 
                        onClick={(e) => handleDelete(p._id, e)}
                        className="p-2.5 text-zinc-700 hover:text-red-500 transition-all rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Policy Modal */}
      {selectedPolicy && isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 tactical-border p-8 space-y-8 relative shadow-2xl">
            <button 
              onClick={() => { setSelectedPolicy(null); setIsEditing(false); }}
              className="absolute top-6 right-6 text-zinc-700 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="space-y-2">
              <span className="text-[9px] font-black text-amber-600/60 uppercase tracking-[0.4em]">Directive_Registry_Override</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none italic">Update Global Protocol</h2>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Protocol Title</label>
                <input 
                  className="cyber-input w-full bg-zinc-900/50"
                  value={editBuffer?.title || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, title: e.target.value})}
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Enforcement Severity</label>
                <select 
                  className="cyber-input w-full bg-zinc-900/50 cursor-pointer"
                  value={editBuffer?.severity || "Low"}
                  onChange={(e) => setEditBuffer({...editBuffer, severity: e.target.value})}
                >
                  {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Directive Parameters</label>
              <textarea 
                className="cyber-input w-full h-36 resize-none bg-zinc-900/50 leading-relaxed"
                value={editBuffer?.description || ""}
                onChange={(e) => setEditBuffer({...editBuffer, description: e.target.value})}
                placeholder="Update protocol parameters..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-900">
              <button 
                onClick={() => { setSelectedPolicy(null); setIsEditing(false); }}
                className="px-6 py-2 border border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:bg-zinc-900 transition-colors"
              >
                Abort
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-10 py-3 bg-amber-600 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                Execute Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
