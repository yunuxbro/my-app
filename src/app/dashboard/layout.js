"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BunkerProvider } from "@/context/BunkerContext";
import DbStatusWidget from "@/components/DbStatusWidget";

const navigation = [
  { name: "Command Overview", href: "/dashboard", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><rect width="7" height="9" x="3" y="3" /><rect width="7" height="5" x="14" y="3" /><rect width="7" height="9" x="14" y="12" /><rect width="7" height="5" x="3" y="16" /></svg>
  )},
  { name: "Survivor Census", href: "/dashboard/census", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { name: "Policy Engine", href: "/dashboard/policies", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
  )},
];

const sectorManagement = [
  { name: "Harvesting", href: "/dashboard/harvesting" },
  { name: "Pulse (Med)", href: "/dashboard/pulse" },
  { name: "Telecom", href: "/dashboard/telecom" },
  { name: "Archive", href: "/dashboard/archive" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BunkerProvider>
      <div className="flex h-screen bg-[#050505] overflow-hidden text-[#d1d5db] font-mono selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Mobile Menu Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="p-8 border-b border-[#1a1a1a]">
            <Link href="/dashboard" className="flex items-center gap-4">
              <div className="h-10 w-10 bg-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-[0.1em] text-white leading-none">NEXUS_CORE</span>
                <span className="font-bold text-[9px] tracking-[0.3em] text-amber-600/80 uppercase mt-1.5">ADM_RELAY_V4.1</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-6 space-y-10">
            <div>
              <h3 className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">System_Nodes</h3>
              <ul className="space-y-1.5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-4 px-5 py-3 text-xs font-black transition-all duration-300 ${pathname === item.href ? "bg-amber-600/10 text-amber-500 border-l-4 border-amber-600" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"}`}
                    >
                      {item.icon}
                      <span className="tracking-widest uppercase">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Sector_Registry</h3>
              <ul className="space-y-1.5">
                {sectorManagement.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-4 px-5 py-3 text-[11px] font-black transition-all duration-300 ${pathname === item.href ? "text-amber-500 bg-amber-600/5 border-r-4 border-amber-600/50" : "text-zinc-500 hover:text-amber-400 hover:bg-zinc-900/50"}`}
                    >
                      <span className={`h-1.5 w-1.5 rotate-45 transition-colors ${pathname === item.href ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-zinc-800"}`} />
                      <span className="tracking-[0.1em] uppercase">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="p-6 border-t border-[#1a1a1a] bg-zinc-950/20">
            <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-zinc-800 border border-zinc-700 text-amber-600 flex items-center justify-center font-black text-xs shadow-inner">RT</div>
                <div>
                  <p className="text-[11px] font-black text-white leading-none tracking-tight">ROOT_OPERATOR</p>
                  <p className="text-[8px] font-bold text-amber-700 uppercase tracking-widest mt-1">LVL_OMEGA</p>
                </div>
              </div>
              <Link href="/login" className="text-zinc-600 hover:text-red-500 transition-all p-1 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-black">
          {/* Global Background Animations */}
          <div className="bg-grid-pulse" />
          <div className="scanning-bar" />
          
          {/* Header */}
          <header className="h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a] flex items-center justify-between px-6 lg:px-10 shrink-0 z-20">
            <div className="flex items-center gap-6">
              <button 
                className="p-2 lg:hidden text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
              <h2 className="text-sm font-black text-white tracking-[0.3em] uppercase truncate italic">
                {navigation.find((n) => n.href === pathname)?.name || "SYSTEM_DASHBOARD"}
              </h2>
              <div className="hidden md:block h-6 w-[1px] bg-zinc-800" />
              <div className="hidden md:block">
                <DbStatusWidget />
              </div>
            </div>
            
            <div className="flex items-center gap-8 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-zinc-700">TERMINAL:</span>
                <span className="text-amber-600/80">TX-09_RELAY</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-700">STAMP:</span>
                <span className="text-white/80">27.05.26_SYNC</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative z-10 custom-scrollbar">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
              {children}
            </div>
          </main>

          {/* Footer Bar */}
          <footer className="h-8 bg-[#0a0a0a] border-t border-[#1a1a1a] px-6 flex items-center justify-between text-[8px] font-black text-zinc-700 tracking-[0.4em] uppercase z-20">
            <div className="flex items-center gap-4">
              <span className="text-amber-900/50">●</span>
              <span>Protocol_Nexus_Active</span>
            </div>
            <div className="flex gap-8">
              <span>Enc_Level: AES-256_GCM</span>
              <span className="text-amber-900/80">Uptime_Link: 99.982%</span>
            </div>
          </footer>
        </div>
      </div>
    </BunkerProvider>
  );
}
