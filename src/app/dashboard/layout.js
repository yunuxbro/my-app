"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BunkerProvider } from "@/context/BunkerContext";
import DbStatusWidget from "@/components/DbStatusWidget";

const navigation = [
  { name: "Command Overview", href: "/dashboard", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
  )},
  { name: "Survivor Census", href: "/dashboard/census", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { name: "Policy Engine", href: "/dashboard/policies", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
  )},
];

const sectorManagement = [
  { name: "Harvesting", href: "/dashboard/harvesting", color: "text-amber-600", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C10.5 14.28 12 13.5 14 11c1 2 1.63 4.1 1 8-.63 3.9-3 6-3 6" /></svg>
  )},
  { name: "Pulse (Med)", href: "/dashboard/pulse", color: "text-blue-600", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  )},
  { name: "Telecom", href: "/dashboard/telecom", color: "text-cyan-600", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.859a10 10 0 0 1 14 0" /><path d="M8.5 16.429a5 5 0 0 1 7 0" /></svg>
  )},
  { name: "Archive (Education)", href: "/dashboard/archive", color: "text-indigo-600", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><path d="M21 14v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><rect width="20" height="8" x="2" y="8" rx="2"/><path d="M6 12h.01"/><path d="M10 12h.01"/></svg>
  )},
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <BunkerProvider>
      <div className="flex h-screen bg-[#050505] overflow-hidden text-white font-sans selection:bg-lime-400 selection:text-black">
        {/* Sidebar - Glassmorphic */}
        <aside className="w-80 bg-zinc-900/50 backdrop-blur-3xl border-r border-white/5 flex flex-col shadow-2xl relative z-20">
          <div className="p-10">
            <Link href="/dashboard" className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:bg-lime-400 group-hover:shadow-lime-400/30 transition-all duration-500 transform group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-white leading-none">NEXUS</span>
                <span className="font-bold text-[10px] tracking-[0.4em] text-lime-400 uppercase mt-1">Registry</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-12">
            <div>
              <h3 className="px-4 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6">Main Interface</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={`flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-sm font-bold transition-all duration-300 group ${pathname === item.href ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:bg-white/5 hover:text-white"}`}>
                      <span className={`${pathname === item.href ? "text-black" : "text-zinc-500 group-hover:text-lime-400"} transition-colors`}>{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="px-4 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6">Domain Sectors</h3>
              <ul className="space-y-2">
                {sectorManagement.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={`flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-[13px] font-bold transition-all duration-300 group ${pathname === item.href ? "bg-zinc-800 text-white border border-white/10" : "text-zinc-500 hover:bg-white/5 hover:text-white"}`}>
                      <span className={`${pathname === item.href ? item.color : "text-zinc-600 group-hover:text-white"} transition-colors`}>{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="p-6 mt-auto">
            <div className="p-5 bg-black/40 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-zinc-800 border border-white/10 text-white flex items-center justify-center font-black text-xs shadow-inner">NP</div>
                <div className="min-w-0">
                  <p className="text-[13px] font-black text-white truncate">Nexus Prime</p>
                  <p className="text-[9px] font-bold text-lime-400 uppercase tracking-widest truncate">Root Admin</p>
                </div>
              </div>
              <Link href="/login" className="text-zinc-600 hover:text-white transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Cyber Header */}
          <header className="h-24 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-16 shadow-2xl shrink-0 z-10">
            <div className="flex items-center gap-8">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                {navigation.find((n) => n.href === pathname)?.name || sectorManagement.find((n) => n.href === pathname)?.name || "Governance"}
              </h2>
              <DbStatusWidget />
            </div>
            <div className="flex items-center gap-10 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              <div className="flex flex-col items-end">
                <span className="text-zinc-600 mb-1">Station ID</span>
                <span className="text-white font-black tracking-[0.3em]">DOMAIN-04</span>
              </div>
              <div className="h-10 w-[1px] bg-white/5" />
              <div className="flex flex-col items-end">
                <span className="text-zinc-600 mb-1">Local Time</span>
                <span className="font-mono text-lime-400 text-lg">24.05.2026</span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-16 bg-[#050505]">
            <div className="max-w-[1400px] mx-auto space-y-16">
              {children}
            </div>
          </main>
        </div>
      </div>
    </BunkerProvider>
  );
}
