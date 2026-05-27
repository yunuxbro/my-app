"use client";

import { useBunker } from "@/context/BunkerContext";
import { useState } from "react";

export default function DashboardOverview() {
  const { policies, survivors, dbConnected, loading, updatePolicy } = useBunker();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState(null);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
        <div className="bg-grid-pulse" />
        <div className="scanning-bar" />
        <div className="text-amber-600 font-black tracking-[0.3em] uppercase animate-pulse z-10 text-lg">System Initializing...</div>
      </div>
    );
  }

  // --- LOGIC AREA ---
  const policiesList = Array.isArray(policies) ? policies : [];
  const enforcedCount = policiesList.filter(p => p?.status === "Enforced").length;
  const enforcementRate = policiesList.length > 0 ? (enforcedCount / policiesList.length) * 100 : 0;
  
  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setEditBuffer({ ...policy });
    setIsEditing(false);
  };

  const handleSavePolicy = async () => {
    if (!selectedPolicy || !editBuffer) return;
    try {
      const res = await updatePolicy(selectedPolicy._id, editBuffer);
      if (res?.success) {
        setSelectedPolicy(res.data);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Save Policy Error:", err);
    }
  };

  const stats = [
    { name: "API_STATUS", value: dbConnected ? "ONLINE" : "OFFLINE", label: "Sector Link", status: dbConnected ? "active" : "danger" },
    { name: "ENFORCEMENT", value: `${Math.round(enforcementRate)}%`, label: "Policy Coverage", status: enforcementRate > 80 ? "active" : "warning" },
    { name: "CENSUS_TOTAL", value: survivors?.length?.toString() || "0", label: "Entities Tracked", status: "active" },
    { name: "SECURITY_LVL", value: "ALPHA", label: "Encryption Active", status: "active" },
  ];

  // --- RENDER AREA ---
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="h-10 w-2 bg-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Command_Overview</h1>
          </div>
          <p className="text-[12px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Administrative Command & Control // Protocol Nexus-01 // Sector Global</p>
        </div>
        {!dbConnected && (
          <div className="px-6 py-3 bg-red-950/20 border border-red-900 flex items-center gap-3 animate-pulse">
            <span className="h-2.5 w-2.5 bg-red-600 rounded-full" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Master Database Offline</span>
          </div>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="command-card group p-8">
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-black text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-widest">{stat.name}</p>
              <div className={`h-2 w-2 rounded-full ${
                stat.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                stat.status === 'warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
              }`} />
            </div>
            <p className={`text-5xl font-black tracking-tighter mb-3 ${
              stat.status === 'danger' ? 'text-red-500' : 'text-white'
            }`}>{stat.value}</p>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sector Integrity & Domain Policies */}
        <div className="lg:col-span-2 command-card group p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black text-white tracking-widest uppercase italic">Sector_Integrity_Diagnostic</h3>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-amber-600" />
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-zinc-800" />
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Degraded</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-6 h-[320px] mb-12">
            {['Harvesting', 'Pulse', 'Telecom', 'Archive', 'Global'].map((domain) => {
              const domainPolicies = policiesList.filter(p => p?.domain?.toLowerCase() === domain.toLowerCase());
              const domainEnforced = domainPolicies.filter(p => p?.status === 'Enforced').length;
              const efficiency = domainPolicies.length > 0 ? (domainEnforced / domainPolicies.length) * 100 : 100;
              
              return (
                <div key={domain} className="flex flex-col gap-4">
                  <div className="relative flex-1 bg-zinc-900/30 flex flex-col justify-end border border-zinc-900/50 group-hover:border-zinc-800 transition-colors overflow-hidden">
                    <div 
                      className={`w-full transition-all duration-[1.5s] ease-out relative ${
                        efficiency === 100 ? "bg-amber-600/30" : 
                        efficiency > 50 ? "bg-zinc-700/30" : 
                        "bg-red-900/30 animate-pulse"
                      }`}
                      style={{ height: `${efficiency}%` }}
                    >
                      <div className={`absolute top-0 left-0 w-full h-[2px] ${
                        efficiency === 100 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : 
                        efficiency > 50 ? "bg-zinc-500" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      }`} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter block border-b border-zinc-900 pb-1">{domain}</span>
                    <div className="space-y-1.5">
                      {domainPolicies.slice(0, 3).map(p => (
                        <button 
                          key={p._id} 
                          onClick={() => handlePolicyClick(p)}
                          className="w-full text-left text-[8px] font-bold text-zinc-500 hover:text-amber-500 truncate uppercase transition-colors flex items-center gap-1.5"
                        >
                          <span className="h-1 w-1 bg-amber-600/50 flex-shrink-0" />
                          {p.title}
                        </button>
                      ))}
                      {domainPolicies.length > 3 && (
                        <span className="text-[7px] text-zinc-700 font-black italic block pt-1">+{domainPolicies.length - 3} MORE</span>
                      )}
                      {domainPolicies.length === 0 && (
                        <span className="text-[7px] text-zinc-800 font-bold uppercase">No Registry</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Data_Source:</span>
              <span className="text-amber-800 font-black text-[11px] tracking-widest uppercase italic">X-NEXUS_GOV_API_V4</span>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-zinc-600">SYSTEM_LOAD</span>
                <span className="text-[11px] font-black text-white">12.4%</span>
              </div>
              <div className="h-12 w-[1px] bg-zinc-900" />
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-zinc-600">UPTIME</span>
                <span className="text-[11px] font-black text-white">99.9%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black text-white tracking-[0.3em] uppercase italic">Intelligence_Feed</h3>
            <span className="text-[9px] font-bold text-amber-600 animate-pulse">LIVE_SYNC</span>
          </div>
          <div className="space-y-4">
            {[
              { title: dbConnected ? "CORE_LINK_SECURED" : "CORE_LINK_SEVERED", desc: dbConnected ? "Handshake verified with Sector-01 API." : "Handshake failed. Protocol Nexus-01 aborted.", type: dbConnected ? "success" : "danger", time: "INSTANT" },
              { title: "POPULATION_THRESHOLD", desc: "Census data indicates stability in Sector-7.", type: "info", time: "14m ago" },
              { title: "DIRECTIVE_ALPHA_REVIEW", desc: "3 new governance policies awaiting signature.", type: "warning", time: "1h ago" }
            ].map((alert, i) => (
              <div key={i} className={`p-6 border-l-2 bg-zinc-900/30 backdrop-blur-md transition-all hover:bg-zinc-900/50 ${
                alert.type === 'danger' ? 'border-red-600' :
                alert.type === 'warning' ? 'border-amber-600' :
                alert.type === 'success' ? 'border-emerald-600' :
                'border-blue-600'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[11px] font-black text-white tracking-tight uppercase leading-none">{alert.title}</p>
                  <span className="text-[8px] font-bold text-zinc-600">{alert.time}</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-bold leading-relaxed">{alert.desc}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-4 border border-zinc-900 text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] hover:bg-zinc-900 hover:text-amber-500 transition-all">
            View_Full_Log
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 tactical-border p-12 space-y-8 relative">
            <button 
              onClick={() => setSelectedPolicy(null)}
              className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="space-y-3">
              <span className="text-[11px] font-black text-amber-600 uppercase tracking-[0.5em]">Directive_Registry_Entry</span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                {isEditing ? (
                  <input 
                    className="bg-zinc-900 border border-zinc-800 text-white px-5 py-3 w-full outline-none focus:border-amber-600 transition-colors text-2xl"
                    value={editBuffer?.title || ""}
                    onChange={(e) => setEditBuffer({...editBuffer, title: e.target.value})}
                  />
                ) : selectedPolicy.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Assigned Domain</p>
                <p className="text-sm font-bold text-zinc-300 uppercase italic">{selectedPolicy.domain}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Severity Index</p>
                {isEditing ? (
                  <select 
                    className="bg-zinc-900 border border-zinc-800 text-sm text-white px-3 py-2 w-full outline-none cursor-pointer"
                    value={editBuffer?.severity || "Low"}
                    onChange={(e) => setEditBuffer({...editBuffer, severity: e.target.value})}
                  >
                    {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <p className={`text-sm font-black uppercase ${
                    selectedPolicy.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'
                  }`}>{selectedPolicy.severity}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Detailed Protocol Description</p>
              {isEditing ? (
                <textarea 
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm p-6 w-full h-44 outline-none focus:border-amber-600 transition-colors resize-none leading-relaxed"
                  value={editBuffer?.description || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, description: e.target.value})}
                  placeholder="Input tactical parameters for this directive..."
                />
              ) : (
                <div className="text-sm text-zinc-400 font-bold leading-relaxed bg-zinc-900/40 p-6 border border-zinc-900 shadow-inner">
                  {selectedPolicy.description || "NO_DESCRIPTION_MAPPED_TO_DIRECTIVE. UPDATE_REQUIRED."}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-6 pt-6">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 border border-zinc-800 text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-colors"
                  >
                    Abort_Changes
                  </button>
                  <button 
                    onClick={handleSavePolicy}
                    className="px-10 py-3 bg-amber-600 text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  >
                    Execute_Update
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-10 py-4 bg-zinc-900 border border-zinc-800 text-amber-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-amber-600 hover:text-black transition-all flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                  Override Directive
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
