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
          fixed inset-y-0 left-0 z-40 w-72 bg-[#0a0a0a] border-r border-[#262626] flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="p-6 border-b border-[#262626]">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="h-8 w-8 bg-amber-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-widest text-white leading-none">NEXUS_CORE</span>
                <span className="font-bold text-[8px] tracking-[0.3em] text-amber-600 uppercase mt-1">EST. 2026 // ADM_VER_4.0</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-8">
            <div>
              <h3 className="px-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4">Core_Systems</h3>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 text-xs font-bold transition-all duration-200 ${pathname === item.href ? "bg-amber-600/10 text-amber-500 border-l-2 border-amber-600" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"}`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="px-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4">Sector_Registry</h3>
              <ul className="space-y-1">
                {sectorManagement.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 text-[11px] font-bold transition-all duration-200 ${pathname === item.href ? "text-white bg-zinc-800" : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900"}`}
                    >
                      <span className="h-1 w-1 bg-zinc-700" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="p-4 border-t border-[#262626]">
            <div className="p-3 bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center font-black text-[9px]">NP</div>
                <div>
                  <p className="text-[10px] font-black text-white leading-none">ROOT_USER</p>
                  <p className="text-[7px] font-bold text-amber-700 uppercase tracking-tighter">CLEARANCE_OMEGA</p>
                </div>
              </div>
              <Link href="/login" className="text-zinc-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          {/* Header */}
          <header className="h-14 bg-[#0a0a0a] border-b border-[#262626] flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
            <div className="flex items-center gap-4">
              <button 
                className="p-1 lg:hidden text-zinc-400 hover:text-white"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
              <h2 className="text-xs font-black text-white tracking-[0.2em] uppercase truncate">
                {navigation.find((n) => n.href === pathname)?.name || "SYSTEM_DASHBOARD"}
              </h2>
              <div className="hidden sm:block h-4 w-[1px] bg-zinc-800" />
              <div className="hidden sm:block">
                <DbStatusWidget />
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
              <div className="hidden md:flex items-center gap-2">
                <span>TERMINAL:</span>
                <span className="text-amber-600">TX-09</span>
              </div>
              <div className="flex items-center gap-2">
                <span>STAMP:</span>
                <span className="text-white">25.05.26</span>
              </div>
            </div>
          </header>

          {/* Main Main */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#050505]">
            <div className="max-w-7xl mx-auto space-y-8 animate-slide-in">
              {children}
            </div>
          </main>

          {/* Footer Bar (Responsive Detail) */}
          <footer className="h-6 bg-[#0a0a0a] border-t border-[#262626] px-4 flex items-center justify-between text-[7px] font-black text-zinc-700 tracking-[0.3em] uppercase">
            <span>Protocol_Nexus_Active</span>
            <div className="flex gap-4">
              <span>Enc_Level: AES-256</span>
              <span className="text-amber-900">Uptime: 99.98%</span>
            </div>
          </footer>
        </div>
      </div>
    </BunkerProvider>
  );
}
