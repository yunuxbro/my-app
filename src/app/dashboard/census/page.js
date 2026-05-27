"use client";

import { useState } from "react";
import { useBunker } from "@/context/BunkerContext";

export default function CensusPage() {
  const { survivors, loading, addSurvivor, toggleSurvivorStatus, updateSurvivor, deleteSurvivor } = useBunker();
  const [selectedSurvivor, setSelectedSurvivor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState(null);
  const [formData, setFormData] = useState({ 
    identity_code: "",
    full_name: "",
    duty: "",
    clearance: "ALPHA",
    status: "Active"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSurvivor(formData);
    setFormData({ 
      identity_code: "",
      full_name: "",
      duty: "",
      clearance: "ALPHA", 
      status: "Active" 
    });
  };

  const handleEditClick = (survivor) => {
    setSelectedSurvivor(survivor);
    setEditBuffer({ ...survivor });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedSurvivor || !editBuffer) return;
    try {
      const res = await updateSurvivor(selectedSurvivor._id, editBuffer);
      if (res?.success) {
        setSelectedSurvivor(null);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Save Survivor Error:", err);
    }
  };

  const handleToggle = async (id) => {
    await toggleSurvivorStatus(id);
  };

  const handleDelete = async (id) => {
    if (confirm("REMOVING NODE FROM REGISTRY. PROCEED?")) {
      await deleteSurvivor(id);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Survivor Census</h1>
        <p className="text-sm text-zinc-500 font-bold tracking-tight max-w-xl italic opacity-80">Live registry of all verified biological nodes within the Nexus ecosystem.</p>
      </div>

      {/* Register Form */}
      <section className="glass-card p-8 bg-zinc-900/10">
        <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest italic opacity-90">
          <span className="h-6 w-1 bg-amber-600/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
          Initialize New Node
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-3">
            <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Node Reference</label>
            <input 
              type="text" 
              required
              value={formData.identity_code}
              onChange={(e) => setFormData({...formData, identity_code: e.target.value})}
              className="cyber-input w-full bg-zinc-950/50"
              placeholder="e.g. NODE-042"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Identity Descriptor</label>
            <input 
              type="text" 
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="cyber-input w-full bg-zinc-950/50"
              placeholder="Full Name..."
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Assigned Sector</label>
            <input 
              type="text" 
              required
              value={formData.duty}
              onChange={(e) => setFormData({...formData, duty: e.target.value})}
              className="cyber-input w-full bg-zinc-950/50"
              placeholder="e.g. Cybernetics"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Access Level</label>
            <select 
              value={formData.clearance}
              onChange={(e) => setFormData({...formData, clearance: e.target.value})}
              className="cyber-input w-full appearance-none cursor-pointer bg-zinc-950/50"
            >
              {['ALPHA', 'BETA', 'GAMMA', 'OMEGA'].map(lvl => (
                <option key={lvl} value={lvl} className="bg-zinc-900">{lvl} PROTOCOL</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full h-14 bg-amber-600/80 hover:bg-amber-600">
              PROCESS ENTRY
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </section>

      {/* Registry Table */}
      <section className="glass-card overflow-hidden bg-zinc-900/10">
        <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/30">
          <h3 className="text-lg font-black text-white tracking-tighter uppercase italic opacity-90">Population Registry</h3>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600/60 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{survivors.length} Verified Nodes</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] border-b border-zinc-900 bg-zinc-950/50">
                <th className="py-6 px-10">Reference</th>
                <th className="py-6 px-6">Identity</th>
                <th className="py-6 px-6">Sector</th>
                <th className="py-6 px-6">Access</th>
                <th className="py-6 px-6 text-center">Status</th>
                <th className="py-6 px-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-24 text-center text-zinc-700 font-bold italic tracking-widest animate-pulse uppercase text-xs">Syncing with Relay...</td>
                </tr>
              ) : survivors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-24 text-center text-zinc-800 font-bold italic tracking-widest uppercase text-xs">No nodes detected in local sector.</td>
                </tr>
              ) : survivors.map((s) => (
                <tr key={s._id} className="hover:bg-amber-600/[0.01] transition-colors group">
                  <td className="py-8 px-10 font-mono text-[10px] font-black text-amber-600/80 uppercase tracking-tighter italic">
                    {s.identity_code}
                  </td>
                  <td className="py-8 px-6">
                    <p className="font-black text-white text-base tracking-tighter uppercase leading-tight">{s.full_name}</p>
                    <p className="text-[8px] text-zinc-600 font-bold mt-1 font-mono tracking-widest uppercase">{new Date(s.created_at).toLocaleString()}</p>
                  </td>
                  <td className="py-8 px-6 text-zinc-500 font-black uppercase text-[10px] tracking-widest italic">
                    {s.duty}
                  </td>
                  <td className="py-8 px-6">
                    <span className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded border border-zinc-800 text-[9px] font-black uppercase tracking-widest">
                      {s.clearance}
                    </span>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <button 
                      onClick={() => handleToggle(s._id)}
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                        s.status === "Active" 
                          ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10" 
                          : "bg-red-500/5 text-red-600 border-red-500/20 hover:bg-red-500/10"
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(s)}
                        className="p-2.5 text-zinc-700 hover:text-amber-600 transition-all rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(s._id)}
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

      {/* Survivor Modal */}
      {selectedSurvivor && isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 tactical-border p-8 space-y-8 relative shadow-2xl">
            <button 
              onClick={() => { setSelectedSurvivor(null); setIsEditing(false); }}
              className="absolute top-6 right-6 text-zinc-700 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="space-y-2">
              <span className="text-[9px] font-black text-amber-600/60 uppercase tracking-[0.4em]">Entity_Registry_Override</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Update Biological Node</h2>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Full Identity Name</label>
                <input 
                  className="cyber-input w-full bg-zinc-900/50"
                  value={editBuffer?.full_name || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Operational Sector</label>
                <input 
                  className="cyber-input w-full bg-zinc-900/50"
                  value={editBuffer?.duty || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, duty: e.target.value})}
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Clearance Protocol</label>
                <select 
                  className="cyber-input w-full bg-zinc-900/50 cursor-pointer"
                  value={editBuffer?.clearance || "ALPHA"}
                  onChange={(e) => setEditBuffer({...editBuffer, clearance: e.target.value})}
                >
                  {['ALPHA', 'BETA', 'GAMMA', 'OMEGA'].map(l => <option key={l} value={l} className="bg-zinc-900">{l} ACCESS</option>)}
                </select>
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Current Vital Status</label>
                <select 
                  className="cyber-input w-full bg-zinc-900/50 cursor-pointer"
                  value={editBuffer?.status || "Active"}
                  onChange={(e) => setEditBuffer({...editBuffer, status: e.target.value})}
                >
                  {['Active', 'Quarantine', 'Discharged'].map(s => <option key={s} value={s} className="bg-zinc-900 text-white">{s.toUpperCase()}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-900">
              <button 
                onClick={() => { setSelectedSurvivor(null); setIsEditing(false); }}
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
