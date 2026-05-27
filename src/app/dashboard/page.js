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
        <div className="text-zinc-600 font-black tracking-[0.4em] uppercase animate-pulse z-10 text-[10px] italic">Link established... Synchronizing...</div>
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
    { name: "API_LINK", value: dbConnected ? "SECURED" : "SEVERED", label: "Sector Link Status", status: dbConnected ? "active" : "danger" },
    { name: "ENFORCEMENT", value: `${Math.round(enforcementRate)}%`, label: "Directive Coverage", status: enforcementRate > 80 ? "active" : "warning" },
    { name: "CENSUS", value: survivors?.length?.toString() || "0", label: "Entities Tracked", status: "active" },
    { name: "SEC_PROTOCOL", value: "ALPHA", label: "Encryption Grade", status: "active" },
  ];

  // --- RENDER AREA ---
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="h-5 w-0.5 bg-amber-600/40" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic">Command_Overview</h1>
          </div>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Protocol Nexus-01 // Sector Global // Node TX-09_RELAY</p>
        </div>
        {!dbConnected && (
          <div className="px-4 py-1.5 bg-red-950/10 border border-red-900/30 flex items-center gap-2 animate-pulse">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-full" />
            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Database Offline</span>
          </div>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="command-card group p-5 bg-zinc-900/10">
            <div className="flex justify-between items-start mb-3">
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{stat.name}</p>
              <div className={`status-dot ${
                stat.status === 'active' ? 'status-active' : 
                stat.status === 'warning' ? 'status-warning' : 'status-danger'
              }`} />
            </div>
            <p className={`text-2xl font-black tracking-tighter mb-1.5 ${
              stat.status === 'danger' ? 'text-red-500/80' : 'text-white/90'
            }`}>{stat.value}</p>
            <p className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Integrity & Domain Policies */}
        <div className="lg:col-span-2 command-card group p-6 bg-zinc-900/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-white tracking-[0.2em] uppercase italic opacity-60">Sector_Integrity_Diagnostic</h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-amber-600/40" />
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-zinc-800" />
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Degraded</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 h-[220px] mb-8">
            {['Harvesting', 'Pulse', 'Telecom', 'Archive', 'Global'].map((domain) => {
              const domainPolicies = policiesList.filter(p => p?.domain?.toLowerCase() === domain.toLowerCase());
              const domainEnforced = domainPolicies.filter(p => p?.status === 'Enforced').length;
              const efficiency = domainPolicies.length > 0 ? (domainEnforced / domainPolicies.length) * 100 : 100;
              
              return (
                <div key={domain} className="flex flex-col gap-2.5">
                  <div className="relative flex-1 bg-zinc-950/40 flex flex-col justify-end border border-zinc-900/40 group-hover:border-zinc-800 transition-colors overflow-hidden">
                    <div 
                      className={`w-full transition-all duration-[1s] ease-out relative ${
                        efficiency === 100 ? "bg-amber-600/5" : 
                        efficiency > 50 ? "bg-zinc-800/20" : 
                        "bg-red-900/5 animate-pulse"
                      }`}
                      style={{ height: `${efficiency}%` }}
                    >
                      <div className={`absolute top-0 left-0 w-full h-[1px] ${
                        efficiency === 100 ? "bg-amber-500/20" : 
                        efficiency > 50 ? "bg-zinc-600/30" : "bg-red-500/20"
                      }`} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[7px] font-black text-zinc-600 uppercase tracking-tighter block border-b border-zinc-900 pb-1 italic">{domain}</span>
                    <div className="space-y-1">
                      {domainPolicies.slice(0, 2).map(p => (
                        <button 
                          key={p._id} 
                          onClick={() => handlePolicyClick(p)}
                          className="w-full text-left text-[6px] font-bold text-zinc-600 hover:text-amber-500/60 truncate uppercase transition-colors flex items-center gap-1"
                        >
                          <span className="h-0.5 w-0.5 bg-zinc-800" />
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest italic">X-NEXUS_API_RELAY_V4.1</span>
            </div>
            <div className="flex items-center gap-6 text-[8px] font-black text-zinc-600 uppercase">
              <div className="flex flex-col items-end">
                <span>SYS_LOAD</span>
                <span className="text-zinc-500">12.4%</span>
              </div>
              <div className="h-6 w-[1px] bg-zinc-900" />
              <div className="flex flex-col items-end">
                <span>UPTIME</span>
                <span className="text-zinc-500">99.9%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[9px] font-black text-zinc-600 tracking-[0.2em] uppercase italic">Intelligence_Feed</h3>
            <span className="text-[7px] font-bold text-amber-600/40 animate-pulse uppercase">Syncing</span>
          </div>
          <div className="space-y-2.5">
            {[
              { title: dbConnected ? "CORE_LINK_SECURED" : "CORE_LINK_SEVERED", desc: dbConnected ? "Handshake verified with Sector-01." : "Handshake failed. Protocol Nexus aborted.", type: dbConnected ? "success" : "danger", time: "NOW" },
              { title: "POPULATION_METRIC", desc: "Census stability achieved in Sector-7.", type: "info", time: "14m" },
              { title: "DIRECTIVE_ALPHA", desc: "3 directives awaiting administrative signature.", type: "warning", time: "1h" }
            ].map((alert, i) => (
              <div key={i} className={`p-3.5 border-l bg-zinc-900/5 transition-all ${
                alert.type === 'danger' ? 'border-red-600/20' :
                alert.type === 'warning' ? 'border-amber-600/20' :
                alert.type === 'success' ? 'border-emerald-600/20' :
                'border-blue-600/20'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[9px] font-black text-zinc-400 tracking-tight uppercase leading-none">{alert.title}</p>
                  <span className="text-[6px] font-bold text-zinc-700">{alert.time}</span>
                </div>
                <p className="text-[8px] text-zinc-600 font-bold leading-relaxed">{alert.desc}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 border border-zinc-900 text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em] hover:bg-zinc-900/30 hover:text-zinc-500 transition-all italic">
            Open_System_Log
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 tactical-border p-8 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => { setSelectedPolicy(null); setIsEditing(false); }}
              className="absolute top-6 right-6 text-zinc-700 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="space-y-1.5">
              <span className="text-[8px] font-black text-amber-600/50 uppercase tracking-[0.4em]">Directive_Entry</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none italic">
                {isEditing ? (
                  <input 
                    className="bg-zinc-900/50 border border-zinc-800 text-white px-3 py-1.5 w-full outline-none focus:border-amber-600/30 transition-colors text-lg"
                    value={editBuffer?.title || ""}
                    onChange={(e) => setEditBuffer({...editBuffer, title: e.target.value})}
                  />
                ) : selectedPolicy.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Assigned Sector</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase italic">{selectedPolicy.domain}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Severity Index</p>
                {isEditing ? (
                  <select 
                    className="bg-zinc-900 border border-zinc-800 text-[10px] text-white px-2 py-1 w-full outline-none"
                    value={editBuffer?.severity || "Low"}
                    onChange={(e) => setEditBuffer({...editBuffer, severity: e.target.value})}
                  >
                    {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <p className={`text-[10px] font-black uppercase ${
                    selectedPolicy.severity === 'Critical' ? 'text-red-500/60' : 'text-amber-500/60'
                  }`}>{selectedPolicy.severity}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Protocol Description</p>
              {isEditing ? (
                <textarea 
                  className="bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-[10px] p-3 w-full h-28 resize-none bg-zinc-900/50 leading-relaxed outline-none focus:border-amber-600/30 transition-colors"
                  value={editBuffer?.description || ""}
                  onChange={(e) => setEditBuffer({...editBuffer, description: e.target.value})}
                  placeholder="Update protocol parameters..."
                />
              ) : (
                <div className="text-[10px] text-zinc-500 font-bold leading-relaxed bg-zinc-900/10 p-4 border border-zinc-900/60">
                  {selectedPolicy.description || "NO_PROTOCOL_DESCRIPTION_REGISTERED"}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-900">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-1.5 border border-zinc-800 text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:bg-zinc-900 transition-colors"
                  >
                    Abort
                  </button>
                  <button 
                    onClick={handleSavePolicy}
                    className="px-6 py-1.5 bg-amber-600/80 text-black text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                  >
                    Commit
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-zinc-900/40 border border-zinc-800 text-amber-600/60 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-black transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path></svg>
                  Override_Directive
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
