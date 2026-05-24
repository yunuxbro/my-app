"use client";

import { useBunker } from "@/context/BunkerContext";

export default function EducationSector() {
  const { policies } = useBunker();
  const educationPolicies = policies.filter(p => p.domain.toLowerCase() === "education");

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Education Hub</h1>
        <p className="text-xl text-slate-500 font-medium italic">Managing global intellectual development and curricula propagation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Literacy Index</p>
          <p className="text-5xl font-extrabold text-slate-900 tracking-tighter">98.4%</p>
          <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Stable Growth
          </div>
        </div>
        <div className="bg-blue-600 p-10 rounded-3xl shadow-xl shadow-blue-100 text-white">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">Sync Status</p>
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-blue-200"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            <span className="text-2xl font-black italic uppercase tracking-tighter">Nodes Linked</span>
          </div>
          <p className="mt-6 text-sm font-bold text-blue-100 leading-relaxed">Curriculum updates are pushed to all 18,402 learning centers in real-time.</p>
        </div>
      </div>

      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Domain Directives (From Policy Engine)</h3>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">Live API Data</span>
        </div>
        <div className="p-8 space-y-6">
          {educationPolicies.length > 0 ? (
            educationPolicies.map((p) => (
              <div key={p.id} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/30 group hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black text-blue-600">{p.id}</span>
                      <h4 className="text-2xl font-black text-slate-800 tracking-tight">{p.title}</h4>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                      p.status === "Enforced" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest text-sm italic">No specific directives for the Education domain.</p>
          )}
        </div>
      </section>
    </div>
  );
}
