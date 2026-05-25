"use client";

import { useBunker } from "@/context/BunkerContext";

export default function DashboardOverview() {
  const { policies, survivors, dbConnected, connectionError, loading } = useBunker();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-100" />
          <p className="text-xl font-black text-slate-800 uppercase tracking-[0.2em] mt-4 italic">Establishing Governance Link...</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocol: Domain-04 Authorization</p>
        </div>
      </div>
    );
  }

  // --- AUTOMATION & DIAGNOSTIC LOGIC ---
  const enforcedCount = policies.filter(p => p.status === "Enforced").length;
  const enforcementRate = policies.length > 0 ? (enforcedCount / policies.length) * 100 : 100;
  
  const alerts = [];
  
  // Connection Alert
  if (!dbConnected) {
    alerts.push({
      title: "CORE DATABASE DISCONNECTED",
      desc: connectionError || "Handshake failed between Governance Terminal and Sector API.",
      type: "warning",
      time: "CRITICAL"
    });
  } else {
    alerts.push({
      title: "System Synchronization Active",
      desc: "Governance database connected. API endpoints validated with X-Nexus-Api-Key.",
      type: "success",
      time: "SECURE"
    });
  }

  const pulseInReview = policies.some(p => p.domain.toLowerCase() === 'pulse' && p.status === 'Review');
  if (pulseInReview) {
    alerts.push({
      title: "PULSE Sync Warning",
      desc: "Healthcare governance directives are under review. Medical routing is operating on legacy fail-safes.",
      type: "warning",
      time: "1m ago"
    });
  }

  const stats = [
    { 
      name: "API Status", 
      value: dbConnected ? "LINKED" : "ERROR", 
      label: dbConnected ? "Authenticated" : "Link Severed", 
      trend: dbConnected ? "up" : "down" 
    },
    { name: "Enforcement", value: `${Math.round(enforcementRate)}%`, label: `${enforcedCount} Active Policies`, trend: enforcementRate > 80 ? "up" : "down" },
    { name: "Census Load", value: survivors.length.toString(), label: "Tracked Entities", trend: "stable" },
    { name: "Security Gate", value: "ACTIVE", label: "Encrypted X-Nexus", trend: "up" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black text-[var(--foreground)] tracking-tighter">Command Overview</h1>
          <p className="text-xl text-slate-400 font-medium italic">Administrative Command & Control: Protocol Nexus-01.</p>
        </div>
        {!dbConnected && (
          <div className="px-6 py-3 bg-red-900/20 border-2 border-red-900/50 rounded-2xl flex items-center gap-4 shadow-lg shadow-red-900/10 animate-bounce">
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-black text-red-400 uppercase tracking-widest">Master Database Offline</span>
          </div>
        )}
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className={`decent-card p-10 group ${
            stat.value === "ERROR" ? "border-red-500/30 bg-red-900/10" : ""
          }`}>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{stat.name}</p>
            <p className={`text-5xl font-extrabold tracking-tighter transition-colors ${
              stat.value === "ERROR" ? "text-red-400" : "text-[var(--foreground)]"
            }`}>{stat.value}</p>
            <div className="flex items-center gap-3 mt-6">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                stat.trend === "up" ? "bg-emerald-900/20 text-emerald-400 border border-emerald-900/50" : 
                stat.trend === "down" ? "bg-red-900/20 text-red-400 border border-red-900/50" : 
                "bg-slate-800/40 text-slate-500 border border-slate-700/50"
              }`}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 decent-card p-10 flex flex-col">
          <h3 className="text-2xl font-black text-[var(--foreground)] mb-10 flex items-center gap-3 italic">
             <span className="h-10 w-1.5 bg-[var(--accent-primary)] rounded-full" />
             Governance Alerts
          </h3>
          <div className="space-y-6">
            {alerts.map((alert, i) => (
              <div key={i} className={`flex gap-6 p-7 rounded-[2rem] border transition-all ${
                alert.type === "warning" ? "bg-orange-900/10 border-orange-900/40" : 
                alert.type === "success" ? "bg-emerald-900/10 border-emerald-900/40" : 
                "bg-slate-800/20 border-slate-800"
              }`}>
                <div className={`h-4 w-4 rounded-full mt-2 shrink-0 ${
                  alert.type === "warning" ? "bg-orange-500 animate-pulse" : 
                  alert.type === "success" ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : 
                  "bg-blue-500"
                }`} />
                <div className="flex-1">
                  <p className={`text-xl font-extrabold leading-tight tracking-tight ${
                    alert.type === "warning" ? "text-orange-200" : 
                    alert.type === "success" ? "text-emerald-200" : 
                    "text-slate-200"
                  }`}>{alert.title}</p>
                  <p className="text-base font-bold text-slate-500 mt-2 leading-relaxed italic">{alert.desc}</p>
                  <p className="text-[10px] font-black text-slate-600 mt-5 uppercase tracking-[0.2em]">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 decent-card p-10">
          <h3 className="text-2xl font-black text-[var(--foreground)] mb-10 tracking-tight">Sector Integrity Diagnostic</h3>
          <div className="h-[400px] flex items-end justify-between gap-8 px-6">
            {['Harvesting', 'Pulse', 'Telecom', 'Archive', 'Global'].map((domain) => {
              const domainPolicies = policies.filter(p => p.domain.toLowerCase() === domain.toLowerCase());
              const domainEnforced = domainPolicies.filter(p => p.status === 'Enforced').length;
              const efficiency = domainPolicies.length > 0 ? (domainEnforced / domainPolicies.length) * 100 : 100;
              
              return (
                <div key={domain} className="flex-1 flex flex-col items-center gap-6 group">
                  <div className="relative w-full h-full flex flex-col justify-end">
                    <div 
                      className={`w-full rounded-t-3xl transition-all duration-[1.5s] ease-out cursor-help shadow-xl ${
                        efficiency === 100 ? "bg-[var(--accent-secondary)]" : 
                        efficiency > 50 ? "bg-slate-700 group-hover:bg-slate-600" : 
                        "bg-orange-900/50 group-hover:bg-orange-800 animate-pulse"
                      }`}
                      style={{ height: `${efficiency}%` }}
                    />
                    <div className="absolute top-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity mb-4">
                       <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">{Math.round(efficiency)}%</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-500 font-mono tracking-tighter uppercase">{domain.slice(0,3)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-12 pt-10 border-t border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Data Source:</span>
              <span className="text-[var(--accent-primary)] font-black text-sm tracking-widest uppercase italic">X-Nexus Governance API</span>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
