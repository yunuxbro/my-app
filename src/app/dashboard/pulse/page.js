import { useBunker } from "@/context/BunkerContext";
import { useState } from "react";
import PolicyEditor from "@/components/PolicyEditor";

export default function PulseSector() {
  const { policies, updatePolicy } = useBunker();
  const pulsePolicies = policies.filter(p => p.domain.toLowerCase() === "pulse");

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
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Pulse_Sector</h1>
        <p className="text-sm text-zinc-500 font-bold tracking-tight max-w-xl italic opacity-80">Biological integrity monitoring and medical response synchronization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="command-card bg-zinc-900/10 p-8">
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Sector Bio-Load</p>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-black text-white tracking-tighter uppercase">98.2%</p>
            <span className="text-[10px] font-bold text-emerald-500 mb-1 tracking-widest uppercase italic">NOMINAL_PULSE</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 mt-6 overflow-hidden">
            <div className="h-full bg-emerald-500 w-[98.2%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
        <div className="command-card bg-blue-600/5 border-blue-600/20 p-8 text-white">
          <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-4">Med-Link_Sync</p>
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-blue-500/60"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
            <span className="text-xl font-black italic uppercase tracking-tighter text-blue-400">Stable_Flow</span>
          </div>
          <p className="mt-6 text-[11px] font-bold text-zinc-500 leading-relaxed italic">Real-time health telemetry from all biological nodes in Sector-7.</p>
        </div>
      </div>

      <section className="glass-card overflow-hidden bg-zinc-900/5">
        <div className="p-6 border-b border-zinc-900 bg-zinc-950/40 flex justify-between items-center">
          <h3 className="text-sm font-black text-white tracking-widest uppercase opacity-80 italic">Medical_Directives</h3>
          <span className="px-3 py-1 bg-blue-600/10 text-blue-400 rounded text-[8px] font-black uppercase tracking-widest border border-blue-600/20">Secured_Line</span>
        </div>
        <div className="p-6 space-y-4">
          {pulsePolicies.length > 0 ? (
            pulsePolicies.map((p) => (
              <div 
                key={p._id} 
                onClick={() => handleEditClick(p)}
                className="p-6 border border-zinc-900 bg-zinc-900/20 hover:border-blue-600/30 hover:bg-zinc-900/40 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-black text-zinc-700 group-hover:text-blue-400/60 transition-colors uppercase italic">{p._id.slice(-8)}</span>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase italic">{p.title}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-bold leading-relaxed max-w-2xl italic">{p.description || "No tactical parameters registered."}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${
                      p.status === "Enforced" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" : "bg-blue-500/5 text-blue-500 border-blue-500/20"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-900">
              <p className="text-zinc-700 font-black uppercase tracking-widest text-[10px] italic">No medical directives mapped to Pulse sector.</p>
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
        title="Update Pulse Protocol"
      />
    </div>
  );
}
