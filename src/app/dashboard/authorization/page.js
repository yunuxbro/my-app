"use client";

import { useState } from "react";

export default function AuthorizationPage() {
  const [admins] = useState([
    { id: "ADM-001", name: "Nexus Prime", role: "Supreme Admin", level: 10, access: "Full System" },
    { id: "ADM-014", name: "Sector Lead Echo", role: "Census Lead", level: 7, access: "Cns-Domain" },
  ]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Clearance_Matrix</h1>
        <p className="text-sm text-zinc-500 font-bold italic opacity-80">Manage administrative hierarchies and biometric clearance keys.</p>
      </div>

      <section className="command-card bg-zinc-900/10 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
          <h3 className="text-base font-black text-white flex items-center gap-3 uppercase tracking-widest italic opacity-90">
             <span className="h-6 w-1 bg-amber-600/60" />
             Active Hierarchy
          </h3>
          <button className="px-5 py-2 rounded bg-red-950/20 text-red-500 border border-red-900/40 text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            Revoke Access
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] border-b border-zinc-900 bg-zinc-950/50">
                <th className="py-4 px-4">Admin ID</th>
                <th className="py-4 px-4">Identity</th>
                <th className="py-4 px-4 text-center">Clearance</th>
                <th className="py-4 px-4 text-right">Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-sm">
              {admins.map((a) => (
                <tr key={a.id} className="hover:bg-zinc-900/40 transition-all group">
                  <td className="py-6 px-4 font-mono text-[10px] font-black text-zinc-700 italic group-hover:text-amber-700/60">{a.id}</td>
                  <td className="py-6 px-4">
                    <p className="font-black text-white uppercase tracking-tight">{a.name}</p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{a.role}</p>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-black text-amber-600/80 font-mono italic">LVL {a.level}</span>
                      <div className="h-1 w-24 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div className="h-full bg-amber-600/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]" style={{ width: `${(a.level/10)*100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <span className="px-3 py-1 rounded bg-zinc-900 text-zinc-500 text-[9px] font-black uppercase tracking-widest border border-zinc-800 italic">
                      {a.access}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="command-card bg-zinc-900/10 p-8">
          <h4 className="text-xs font-black text-white mb-8 uppercase tracking-widest italic opacity-80">Security Protocol Toggles</h4>
          <div className="space-y-3">
            {[
              "Multi-Factor Neural Auth",
              "Biometric Scanning",
              "AI Behavioral Analysis",
            ].map(label => (
              <div key={label} className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 group hover:border-amber-600/30 transition-all">
                <span className="text-[11px] font-black text-zinc-400 uppercase tracking-tight italic">{label}</span>
                <button className="h-5 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-end px-0.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-amber-600/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                </button>
              </div>
            ))}
          </div>
        </section>
        
        <section className="command-card bg-emerald-950/5 border-emerald-900/20 p-10 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" className="opacity-60"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
          <h4 className="text-xl font-black text-emerald-500/80 uppercase tracking-tighter italic leading-none">System Integrity: 100%</h4>
          <p className="text-[9px] font-bold text-zinc-600 mt-2 uppercase tracking-[0.3em]">Global Firewall Active</p>
          <button className="mt-8 px-8 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 hover:text-white transition-all active:scale-95 shadow-lg shadow-black/20">
            Run Diagnostic
          </button>
        </section>
      </div>
    </div>
  );
}
