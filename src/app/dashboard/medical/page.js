"use client";

import { useState } from "react";

export default function MedicalSector() {
  const [facilities] = useState([
    { name: "Central Med-Hub", capacity: 92, resources: "High", status: "Nominal" },
    { name: "Zone 3 Clinic", capacity: 45, resources: "Nominal", status: "Nominal" },
  ]);

  const [emergency, setEmergency] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Medical_Sector</h1>
          <p className="text-sm text-zinc-500 font-bold mt-2 italic opacity-80">Global health monitoring and facility management.</p>
        </div>
        <button 
          onClick={() => setEmergency(!emergency)}
          className={`px-8 py-3 rounded text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 border-2 ${
            emergency 
              ? "bg-red-600/10 text-red-500 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse" 
              : "bg-zinc-900/40 text-red-500 border-zinc-800 hover:border-red-600/50"
          }`}
        >
          {emergency ? "EMERGENCY PROTOCOL ACTIVE" : "INITIATE EMERGENCY OVERRIDE"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="command-card bg-zinc-900/10 p-8">
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-4">Global Health Index</p>
          <div className="flex items-end gap-3">
            <p className="text-5xl font-black text-white tracking-tighter uppercase text-emerald-500/80">94.1</p>
            <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[9px] uppercase tracking-widest italic mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
              Stable
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 command-card bg-zinc-900/10 p-8">
          <h3 className="text-xs font-black text-white mb-8 tracking-widest uppercase italic opacity-80">Facility_Load_Registry</h3>
          <div className="space-y-4">
            {facilities.map(f => (
              <div key={f.name} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-zinc-950/40 border border-zinc-900">
                <span className="text-sm font-black text-zinc-300 uppercase italic tracking-tighter">{f.name}</span>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Resource Load</p>
                    <span className="text-xs font-black text-blue-500/80 uppercase tracking-widest">{f.resources}</span>
                  </div>
                  <div className="h-6 w-[1px] bg-zinc-900" />
                  <div className="text-right">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Occupancy</p>
                    <p className="text-xs font-black text-zinc-400 tracking-widest">{f.capacity}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="command-card bg-zinc-900/10 p-8">
        <h3 className="text-xs font-black text-white mb-8 tracking-widest uppercase italic opacity-80">Research_Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center group hover:border-blue-600/30 transition-all cursor-pointer bg-zinc-950/20">
            <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 text-blue-500/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <p className="text-sm font-black text-zinc-500 uppercase tracking-widest">New Grant Proposal</p>
            <p className="text-[8px] font-bold text-zinc-700 mt-2 uppercase tracking-[0.2em]">Level 7 Authorization Required</p>
          </div>
          <div className="p-8 border border-zinc-800 bg-blue-600/5 shadow-inner text-white">
            <h4 className="text-sm font-black mb-4 uppercase tracking-widest text-blue-500/80 italic">Neural_Regeneration_V2</h4>
            <div className="space-y-4">
              <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                <div className="h-full bg-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.3)]" style={{ width: '84%' }} />
              </div>
              <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                <span>Phase: Human_Trials</span>
                <span className="text-blue-500/80 italic">84% Progress_Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
