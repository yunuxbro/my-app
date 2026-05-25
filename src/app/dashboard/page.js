"use client";

import { useBunker } from "@/context/BunkerContext";

export default function DashboardOverview() {
  const { policies, survivors, dbConnected, connectionError, loading } = useBunker();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 border-2 border-amber-600 border-t-transparent rounded-none animate-spin" />
          <p className="text-xs font-black text-amber-600 uppercase tracking-[0.3em] mt-4">Initializing Command Link...</p>
        </div>
      </div>
    );
  }

  const enforcedCount = policies.filter(p => p.status === "Enforced").length;
  const enforcementRate = policies.length > 0 ? (enforcedCount / policies.length) * 100 : 0;
  
  const alerts = [
    {
      title: dbConnected ? "CORE_LINK_SECURED" : "CORE_LINK_SEVERED",
      desc: dbConnected ? "Handshake verified with Sector-01 API. Encrypted tunnel active." : connectionError || "Handshake failed. Protocol Nexus-01 aborted.",
      type: dbConnected ? "success" : "danger",
      time: "INSTANT"
    },
    {
      title: "POPULATION_THRESHOLD",
      desc: "Census data indicates stability in Sector-7. Resource allocation optimized.",
      type: "info",
      time: "14m ago"
    },
    {
      title: "DIRECTIVE_ALPHA_REVIEw",
      desc: "3 new governance policies awaiting administrative signature.",
      type: "warning",
      time: "1h ago"
    }
  ];

  const stats = [
    { name: "API_STATUS", value: dbConnected ? "ONLINE" : "OFFLINE", label: "Sector Link", status: dbConnected ? "active" : "danger" },
    { name: "ENFORCEMENT", value: `${Math.round(enforcementRate)}%`, label: "Policy Coverage", status: enforcementRate > 80 ? "active" : "warning" },
    { name: "CENSUS_TOTAL", value: survivors.length.toString(), label: "Entities Tracked", status: "active" },
    { name: "SECURITY_LVL", value: "ALPHA", label: "Encryption Active", status: "active" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="h-4 w-1 bg-amber-600" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Command_Overview</h1>
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Administrative Command & Control // Protocol Nexus-01 // Sector Global</p>
        </div>
        {!dbConnected && (
          <div className="px-4 py-2 bg-red-950/20 border border-red-900 flex items-center gap-3 animate-pulse">
            <span className="h-2 w-2 bg-red-600" />
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Master Database Offline</span>
          </div>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-zinc-950/50 backdrop-blur-md border border-zinc-900 p-6 relative transition-all duration-300 hover:border-amber-600/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:-translate-y-1 group">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{stat.name}</p>
              <div className={`status-dot ${
                stat.status === 'active' ? 'status-active' : 
                stat.status === 'warning' ? 'status-warning' : 'status-danger'
              }`} />
            </div>
            <p className={`text-3xl font-black tracking-tighter mb-2 ${
              stat.status === 'danger' ? 'text-red-500' : 'text-white'
            }`}>{stat.value}</p>
            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intelligence Feed */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black text-white tracking-widest">Intelligence_Feed</h3>
            <span className="text-[8px] font-bold text-amber-600">LIVE_SYNC</span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className={`p-4 border-l-2 bg-zinc-900/30 ${
                alert.type === 'danger' ? 'border-red-600 bg-red-900/5' :
                alert.type === 'warning' ? 'border-amber-600 bg-amber-900/5' :
                alert.type === 'success' ? 'border-emerald-600 bg-emerald-900/5' :
                'border-blue-600 bg-blue-900/5'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-black text-white tracking-tight">{alert.title}</p>
                  <span className="text-[7px] font-bold text-zinc-600">{alert.time}</span>
                </div>
                <p className="text-[9px] text-zinc-400 font-bold leading-relaxed">{alert.desc}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-2 border border-zinc-800 text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-colors">
            View_Full_Log
          </button>
        </div>

        {/* Sector Integrity */}
        <div className="lg:col-span-2 bg-zinc-950/50 backdrop-blur-md border border-zinc-900 p-6 relative transition-all duration-300 hover:border-amber-600/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:-translate-y-1 group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-white tracking-widest">Sector_Integrity_Diagnostic</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber-600" />
                <span className="text-[7px] font-bold text-zinc-500">OPTIMIZED</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-zinc-800" />
                <span className="text-[7px] font-bold text-zinc-500">DEGRADED</span>
              </div>
            </div>
          </div>
          
          <div className="h-[250px] flex items-end justify-between gap-4 px-2">
            {['Harvesting', 'Pulse', 'Telecom', 'Archive', 'Global'].map((domain) => {
              const domainPolicies = policies.filter(p => p.domain.toLowerCase() === domain.toLowerCase());
              const domainEnforced = domainPolicies.filter(p => p.status === 'Enforced').length;
              const efficiency = domainPolicies.length > 0 ? (domainEnforced / domainPolicies.length) * 100 : 100;
              
              return (
                <div key={domain} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full h-full bg-zinc-900/50 flex flex-col justify-end border-x border-t border-zinc-900">
                    <div 
                      className={`w-full transition-all duration-[1.5s] ease-out relative ${
                        efficiency === 100 ? "bg-amber-600/40" : 
                        efficiency > 50 ? "bg-zinc-700/40" : 
                        "bg-red-900/40 animate-pulse"
                      }`}
                      style={{ height: `${efficiency}%` }}
                    >
                      <div className={`absolute top-0 left-0 w-full h-[1px] ${
                        efficiency === 100 ? "bg-amber-500" : 
                        efficiency > 50 ? "bg-zinc-500" : "bg-red-500"
                      }`} />
                    </div>
                  </div>
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">{domain.slice(0,4)}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">Data_Source:</span>
              <span className="text-amber-700 font-black text-[9px] tracking-widest uppercase italic">X-NEXUS_GOV_API_V4</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-zinc-500">SYSTEM_LOAD</span>
                <span className="text-[9px] font-black text-white">12.4%</span>
              </div>
              <div className="h-8 w-[1px] bg-zinc-900" />
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-zinc-500">UPTIME</span>
                <span className="text-[9px] font-black text-white">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer System Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-zinc-900 bg-zinc-900/10">
          <h4 className="text-[10px] font-black text-zinc-500 mb-4 uppercase tracking-[0.2em]">Operational_Directives</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-[9px] font-bold text-zinc-400">Resource Rationing</span>
              <span className="text-[9px] font-black text-amber-600">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-[9px] font-bold text-zinc-400">Curfew Enforcement</span>
              <span className="text-[9px] font-black text-amber-600">LEVEL_3</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-[9px] font-bold text-zinc-400">External Comms</span>
              <span className="text-[9px] font-black text-red-700">RESTRICTED</span>
            </div>
          </div>
        </div>
        <div className="p-6 border border-zinc-900 bg-zinc-900/10">
          <h4 className="text-[10px] font-black text-zinc-500 mb-4 uppercase tracking-[0.2em]">Terminal_Diagnostics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[7px] font-bold text-zinc-600">MEM_ALLOC</p>
              <div className="h-1 w-full bg-zinc-900">
                <div className="h-full bg-amber-600 w-[65%]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[7px] font-bold text-zinc-600">CPU_USAGE</p>
              <div className="h-1 w-full bg-zinc-900">
                <div className="h-full bg-amber-600 w-[22%]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[7px] font-bold text-zinc-600">NET_TRAFFIC</p>
              <div className="h-1 w-full bg-zinc-900">
                <div className="h-full bg-amber-600 w-[41%]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[7px] font-bold text-zinc-600">DISK_I/O</p>
              <div className="h-1 w-full bg-zinc-900">
                <div className="h-full bg-amber-600 w-[12%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
