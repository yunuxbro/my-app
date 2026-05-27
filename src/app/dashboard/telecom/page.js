"use client";

import { useBunker } from "@/context/BunkerContext";
import { useState } from "react";

export default function TelecomSector() {
  const { policies, updatePolicy } = useBunker();
  const telecomPolicies = policies.filter(p => p.domain.toLowerCase() === "telecom");

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState(null);

  const handleEditClick = (p) => {
    setSelectedPolicy(p);
    setEditBuffer({ ...p });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const res = await updatePolicy(selectedPolicy._id, editBuffer);
    if (res.success) {
      setSelectedPolicy(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Telecom_Hub</h1>
        <p className="text-sm text-zinc-500 font-bold tracking-tight max-w-xl italic opacity-80">Encrypted communication relay and signal integrity management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="command-card bg-zinc-900/10 p-8">
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Signal Integrity</p>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-black text-white tracking-tighter uppercase">99.9%</p>
            <span className="text-[10px] font-bold text-emerald-500 mb-1 tracking-widest uppercase italic">CRYPTO_LOCK_ACTIVE</span>
          </div>
          <div className="h-1 w-full bg-zinc-900 mt-6 flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`h-full flex-1 ${i < 19 ? 'bg-emerald-500/40' : 'bg-zinc-800'}`} />
            ))}
          </div>
        </div>
        <div className="command-card bg-purple-600/5 border-purple-600/20 p-8 text-white">
          <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest mb-4">Relay_Node_Status</p>
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-purple-500/60"><rect width="2" height="7" x="2" y="14" /><rect width="2" height="9" x="6" y="12" /><rect width="2" height="13" x="10" y="8" /><rect width="2" height="17" x="14" y="4" /><rect width="2" height="20" x="18" y="1" /></svg>
            <span className="text-xl font-black italic uppercase tracking-tighter text-purple-400">Broadcasting</span>
          </div>
          <p className="mt-6 text-[11px] font-bold text-zinc-500 leading-relaxed italic">Omni-directional relay active. Encryption rotation synced with master clock.</p>
        </div>
      </div>

      <section className="glass-card overflow-hidden bg-zinc-900/5">
        <div className="p-6 border-b border-zinc-900 bg-zinc-950/40 flex justify-between items-center">
          <h3 className="text-sm font-black text-white tracking-widest uppercase opacity-80 italic">Comms_Directives</h3>
          <span className="px-3 py-1 bg-purple-600/10 text-purple-400 rounded text-[8px] font-black uppercase tracking-widest border border-purple-600/20">Bandwidth_Alpha</span>
        </div>
        <div className="p-6 space-y-4">
          {telecomPolicies.length > 0 ? (
            telecomPolicies.map((p) => (
              <div 
                key={p._id} 
                onClick={() => handleEditClick(p)}
                className="p-6 border border-zinc-900 bg-zinc-900/20 hover:border-purple-600/30 hover:bg-zinc-900/40 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-black text-zinc-700 group-hover:text-purple-400/60 transition-colors uppercase italic">{p._id.slice(-8)}</span>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase italic">{p.title}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-bold leading-relaxed max-w-2xl italic">{p.description || "No tactical parameters registered."}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${
                      p.status === "Enforced" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" : "bg-purple-500/5 text-purple-500 border-purple-500/20"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-900">
              <p className="text-zinc-700 font-black uppercase tracking-widest text-[10px] italic">No comms directives mapped to Telecom sector.</p>
            </div>
          )}
        </div>
      </section>

      {/* Edit Modal */}
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
              <span className="text-[9px] font-black text-purple-600/60 uppercase tracking-[0.4em]">Sector_Directive_Override</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none italic">Update Telecom Protocol</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Protocol Title</label>
                <input 
                  className="cyber-input w-full bg-zinc-900/50"
                  value={editBuffer?.title || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, title: e.target.value})}
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Directive Parameters</label>
                <textarea 
                  className="cyber-input w-full h-36 resize-none bg-zinc-900/50 leading-relaxed"
                  value={editBuffer?.description || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, description: e.target.value})}
                  placeholder="Update comms protocol parameters..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-900">
              <button 
                onClick={() => { setSelectedPolicy(null); setIsEditing(false); }}
                className="px-6 py-2 border border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:bg-zinc-900 transition-colors"
              >
                Abort
              </button>
              <button 
                onClick={handleSave}
                className="px-10 py-3 bg-purple-600 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(147,51,234,0.2)]"
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
