"use client";

import { useBunker } from "@/context/BunkerContext";
import { useState } from "react";
import PolicyEditor from "@/components/PolicyEditor";

export default function HarvestingSector() {
  const { policies, updatePolicy } = useBunker();
  const harvestingPolicies = policies.filter(p => p.domain.toLowerCase() === "harvesting");
  
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
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Harvesting_Hub</h1>
        <p className="text-sm text-zinc-500 font-bold tracking-tight max-w-xl italic opacity-80">Resource extraction monitoring and nutrient distribution logistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="command-card bg-zinc-900/10 p-8">
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Total Yield Index</p>
          <p className="text-4xl font-black text-white tracking-tighter uppercase">14.2M <span className="text-sm font-bold text-zinc-700 tracking-widest">Tons_Total</span></p>
          <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest italic">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            +5.4% Optimization_Sync
          </div>
        </div>
        <div className="command-card bg-amber-600/5 border-amber-600/20 p-8 text-white">
          <p className="text-[9px] font-bold text-amber-600/80 uppercase tracking-widest mb-4">Logistics_Link</p>
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-amber-600/60"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C10.5 14.28 12 13.5 14 11c1 2 1.63 4.1 1 8-.63 3.9-3 6-3 6" /></svg>
            <span className="text-xl font-black italic uppercase tracking-tighter text-amber-500">Chain_Nominal</span>
          </div>
          <p className="mt-6 text-[11px] font-bold text-zinc-500 leading-relaxed italic">Global supply chain synchronized with census consumption metrics.</p>
        </div>
      </div>

      <section className="glass-card overflow-hidden bg-zinc-900/5">
        <div className="p-6 border-b border-zinc-900 bg-zinc-950/40 flex justify-between items-center">
          <h3 className="text-sm font-black text-white tracking-widest uppercase opacity-80 italic">Sector_Directives</h3>
          <span className="px-3 py-1 bg-amber-600/10 text-amber-600 rounded text-[8px] font-black uppercase tracking-widest border border-amber-600/20">Active_Relay</span>
        </div>
        <div className="p-6 space-y-4">
          {harvestingPolicies.length > 0 ? (
            harvestingPolicies.map((p) => (
              <div 
                key={p._id} 
                onClick={() => handleEditClick(p)}
                className="p-6 border border-zinc-900 bg-zinc-900/20 hover:border-amber-600/30 hover:bg-zinc-900/40 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-black text-zinc-700 group-hover:text-amber-700/60 transition-colors uppercase italic">{p._id.slice(-8)}</span>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase italic">{p.title}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-bold leading-relaxed max-w-2xl italic">{p.description || "No tactical parameters registered."}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${
                      p.status === "Enforced" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" : "bg-amber-500/5 text-amber-600 border-amber-500/20"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-900">
              <p className="text-zinc-700 font-black uppercase tracking-widest text-[10px] italic">No specific directives mapped to Harvesting sector.</p>
            </div>
          )}
        </div>
      </section>

      {/* Edit Modal */}
      <PolicyEditor
        isOpen={isEditing}
        editBuffer={editBuffer}
        setEditBuffer={setEditBuffer}
        onSave={handleSave}
        onCancel={() => { setSelectedPolicy(null); setIsEditing(false); }}
        title="Update Harvesting Protocol"
      />
    </div>
  );
}
