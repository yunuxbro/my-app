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
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Survivor Census</h1>
        <p className="text-xl text-zinc-500 font-bold tracking-tight max-w-2xl">Live registry of all verified biological nodes within the Nexus ecosystem. Enforce protocols via the status override.</p>
      </div>

      {/* Register Form */}
      <section className="glass-card p-12 neon-border">
        <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 uppercase italic tracking-widest">
          <span className="h-10 w-2 bg-amber-600 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
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
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Population Registry</h3>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <span className="text-[11px] font-black text-amber-600 uppercase tracking-[0.3em]">{survivors.length} Verified Nodes</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] border-b border-zinc-900 bg-zinc-950/50">
                <th className="py-8 px-12">Reference</th>
                <th className="py-8 px-8">Identity</th>
                <th className="py-8 px-8">Sector</th>
                <th className="py-8 px-8">Access</th>
                <th className="py-8 px-8 text-center">Status</th>
                <th className="py-8 px-12 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center text-zinc-600 font-bold italic tracking-widest animate-pulse uppercase">Syncing with Node Registry...</td>
                </tr>
              ) : survivors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center text-zinc-600 font-bold italic tracking-widest uppercase text-xs">No nodes found in local cluster cluster. registry empty.</td>
                </tr>
              ) : survivors.map((s) => (
                <tr key={s._id} className="hover:bg-amber-600/[0.02] transition-colors group">
                  <td className="py-10 px-12 font-mono text-sm font-black text-amber-600 uppercase tracking-tighter">
                    {s.identity_code}
                  </td>
                  <td className="py-10 px-8">
                    <p className="font-black text-white text-xl tracking-tighter uppercase">{s.full_name}</p>
                    <p className="text-[10px] text-zinc-600 font-bold mt-1 font-mono tracking-widest">{new Date(s.created_at).toLocaleString().toUpperCase()}</p>
                  </td>
                  <td className="py-10 px-8 text-zinc-400 font-black uppercase text-[11px] tracking-[0.2em] italic">
                    {s.duty}
                  </td>
                  <td className="py-10 px-8">
                    <span className="px-4 py-2 bg-zinc-900 text-zinc-300 rounded border border-zinc-800 text-[10px] font-black uppercase tracking-widest group-hover:border-amber-600/30 transition-all">
                      {s.clearance}
                    </span>
                  </td>
                  <td className="py-10 px-8 text-center">
                    <button 
                      onClick={() => handleToggle(s._id)}
                      className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                        s.status === "Active" 
                          ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20" 
                          : "bg-red-500/5 text-red-500 border-red-500/20 hover:bg-red-500/20 animate-pulse"
                      }`}
                    >
                      {s.status}
                    </button>
                  </td>
                  <td className="py-10 px-12 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => handleEditClick(s)}
                        className="p-3 text-zinc-600 hover:text-amber-500 transition-all rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(s._id)}
                        className="p-3 text-zinc-600 hover:text-red-500 transition-all rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 p-12 space-y-10 relative tactical-border">
            <button 
              onClick={() => { setSelectedSurvivor(null); setIsEditing(false); }}
              className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="space-y-3">
              <span className="text-[11px] font-black text-amber-600 uppercase tracking-[0.5em]">Entity_Registry_Override</span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Update Biological Node</h2>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Full Identity Name</label>
                <input 
                  className="cyber-input w-full"
                  value={editBuffer?.full_name || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Operational Sector</label>
                <input 
                  className="cyber-input w-full"
                  value={editBuffer?.duty || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, duty: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Clearance Protocol</label>
                <select 
                  className="cyber-input w-full cursor-pointer"
                  value={editBuffer?.clearance || "ALPHA"}
                  onChange={(e) => setEditBuffer({...editBuffer, clearance: e.target.value})}
                >
                  {['ALPHA', 'BETA', 'GAMMA', 'OMEGA'].map(l => <option key={l} value={l} className="bg-zinc-900">{l} ACCESS</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Current Vital Status</label>
                <select 
                  className="cyber-input w-full cursor-pointer"
                  value={editBuffer?.status || "Active"}
                  onChange={(e) => setEditBuffer({...editBuffer, status: e.target.value})}
                >
                  {['Active', 'Quarantine', 'Discharged'].map(s => <option key={s} value={s} className="bg-zinc-900 text-white">{s.toUpperCase()}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-6 border-t border-zinc-900">
              <button 
                onClick={() => { setSelectedSurvivor(null); setIsEditing(false); }}
                className="px-8 py-3 border border-zinc-800 text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] hover:bg-zinc-900 transition-colors"
              >
                Abort
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-10 py-3 bg-amber-600 text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
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
