"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BunkerProvider } from "@/context/BunkerContext";
import DbStatusWidget from "@/components/DbStatusWidget";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="7" height="9" x="3" y="3" /><rect width="7" height="5" x="14" y="3" /><rect width="7" height="9" x="14" y="12" /><rect width="7" height="5" x="3" y="16" /></svg>
  )},
  { name: "Census", href: "/dashboard/census", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { name: "Policies", href: "/dashboard/policies", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
  )},
];

const sectorManagement = [
  { name: "Harvesting", href: "/dashboard/harvesting" },
  { name: "Pulse", href: "/dashboard/pulse" },
  { name: "Telecom", href: "/dashboard/telecom" },
  { name: "Archive", href: "/dashboard/archive" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BunkerProvider>
      <div className="flex flex-col h-screen bg-[#050505] overflow-hidden text-[#d1d5db] font-mono selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Mobile Menu Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar (Hidden on Desktop) */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col transition-transform duration-300 lg:hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="p-8 border-b border-[#1a1a1a]">
            <Link href="/dashboard" className="flex items-center gap-4" onClick={() => setIsSidebarOpen(false)}>
              <div className="h-10 w-10 bg-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <span className="font-black text-xl tracking-[0.1em] text-white leading-none uppercase">Nexus_Core</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-6 space-y-10">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] px-2">Core_Systems</h3>
              <div className="space-y-1.5">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-xs font-black transition-all ${pathname === item.href ? 'text-amber-500 bg-amber-600/5 border-l-2 border-amber-600' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'}`}>
                    {item.icon} {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] px-2">Sector_Registry</h3>
              <div className="space-y-1.5">
                {sectorManagement.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-xs font-black transition-all ${pathname === item.href ? 'text-amber-500 bg-amber-600/5 border-l-2 border-amber-600' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'}`}>
                    <span className="h-1 w-1 rotate-45 bg-current" /> {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        {/* Global Header & Top Nav */}
        <header className="h-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a] flex items-center justify-between px-6 lg:px-12 shrink-0 z-40">
          <div className="flex items-center gap-10">
            {/* Mobile Toggle */}
            <button className="lg:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-4 group">
              <div className="h-9 w-9 bg-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-black text-lg tracking-widest text-white leading-none uppercase">Nexus_Core</span>
                <span className="text-[7px] font-black text-amber-600/60 tracking-[0.4em] mt-1 italic uppercase">V4.1_Alpha</span>
              </div>
            </Link>

            {/* Desktop Horizontal Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              <div className="h-8 w-[1px] bg-zinc-800/50 mx-4" />
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className={`px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white ${pathname === item.href ? 'text-amber-500' : 'text-zinc-600'}`}>
                  {item.name}
                </Link>
              ))}
              <div className="h-4 w-[1px] bg-zinc-800/50 mx-2" />
              <div className="flex items-center gap-1">
                {sectorManagement.map((item) => (
                  <Link key={item.name} href={item.href} className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white ${pathname === item.href ? 'text-amber-500' : 'text-zinc-600'}`}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <DbStatusWidget />
            </div>
            
            <div className="hidden xl:flex items-center gap-6 border-l border-zinc-900 pl-8">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-zinc-700 tracking-widest uppercase">Operator</span>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">Root_Admin</span>
              </div>
              <div className="h-8 w-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-[10px] text-amber-600">RT</div>
            </div>

            <Link href="/login" className="text-zinc-700 hover:text-red-500 transition-all p-1 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {/* Global Background Animations */}
          <div className="bg-grid-pulse" />
          <div className="scanning-bar" />

          {/* Scrollable Container */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative z-10 custom-scrollbar">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
              {children}
            </div>
          </main>

          {/* Footer Bar */}
          <footer className="h-8 bg-[#0a0a0a] border-t border-[#1a1a1a] px-6 flex items-center justify-between text-[8px] font-black text-zinc-800 tracking-[0.4em] uppercase z-20">
            <div className="flex items-center gap-4">
              <span className="text-amber-900/30">●</span>
              <span>Nexus_Core_Relay_Active</span>
            </div>
            <div className="flex gap-8">
              <span>Enc_Standard: AES-256_GCM</span>
              <span className="text-amber-900/60 font-black">Sync_Rate: 99.98%</span>
            </div>
          </footer>
        </div>
      </div>
    </BunkerProvider>
  );
}
