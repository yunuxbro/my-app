"use client";

import { useState } from "react";

export default function AuthorizationPage() {
  const [admins, setAdmins] = useState([
    { id: "ADM-001", name: "Nexus Prime", role: "Supreme Admin", level: 10, access: "Full System" },
    { id: "ADM-014", name: "Sector Lead Echo", role: "Census Lead", level: 7, access: "Cns-Domain" },
  ]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Clearance Matrix</h1>
        <p className="text-xl text-slate-500 font-medium">Manage administrative hierarchies and biometric clearance keys.</p>
      </div>

      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm shadow-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
             <span className="h-8 w-1 bg-blue-600 rounded-full" />
             Active Hierarchy
          </h3>
          <button className="px-6 py-3 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            Revoke Access
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="pb-6 px-4">Admin ID</th>
                <th className="pb-6 px-4">Identity</th>
                <th className="pb-6 px-4 text-center">Clearance</th>
                <th className="pb-6 px-4 text-right">Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-lg">
              {admins.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-all">
                  <td className="py-8 px-4 font-mono text-sm font-bold text-slate-400">{a.id}</td>
                  <td className="py-8 px-4">
                    <p className="font-bold text-slate-800">{a.name}</p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{a.role}</p>
                  </td>
                  <td className="py-8 px-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xl font-black text-blue-600 font-mono italic">LVL {a.level}</span>
                      <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200">
                        <div className="h-full bg-blue-600 shadow-sm" style={{ width: `${(a.level/10)*100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-4 text-right">
                    <span className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest border border-slate-200">
                      {a.access}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm shadow-slate-100">
          <h4 className="text-xl font-bold text-slate-800 mb-8 uppercase tracking-tight italic">Security Protocol Toggles</h4>
          <div className="space-y-4">
            {[
              "Multi-Factor Neural Auth",
              "Biometric Scanning",
              "AI Behavioral Analysis",
            ].map(label => (
              <div key={label} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-300 transition-all">
                <span className="text-base font-bold text-slate-800">{label}</span>
                <button className="h-8 w-14 rounded-full bg-blue-600 flex items-center justify-end px-1 shadow-inner">
                  <div className="h-6 w-6 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center text-white">
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
          <h4 className="text-2xl font-extrabold">System Integrity: 100%</h4>
          <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Global Firewall Active</p>
          <button className="mt-8 px-10 py-3 rounded-xl bg-white text-slate-900 text-sm font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/5">
            Run Diagnostic
          </button>
        </section>
      </div>
    </div>
  );
}
