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
      <div className="flex h-screen bg-[var(--background)] overflow-hidden text-[var(--foreground)] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Sidebar - Sophisticated Dark */}
        <aside className="w-72 bg-[var(--surface-card)] border-r border-[var(--surface-border)] flex flex-col relative z-20">
          <div className="p-8">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-[var(--foreground)] leading-none">NexusCore</span>
                <span className="font-medium text-[9px] tracking-[0.2em] text-slate-500 uppercase mt-1">Command v2.4</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-10">
            <div>
              <h3 className="px-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Operations</h3>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${pathname === item.href ? "bg-slate-800/40 text-[var(--accent-primary)] border border-slate-700/30" : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/20"}`}>
                      <span className={`${pathname === item.href ? "text-[var(--accent-primary)]" : "text-slate-600 group-hover:text-[var(--accent-primary)]"} transition-colors`}>{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="px-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Sectors</h3>
              <ul className="space-y-1">
                {sectorManagement.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 group ${pathname === item.href ? "bg-slate-800/40 text-[var(--foreground)] border border-slate-700/30" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/20"}`}>
                      <span className={`${pathname === item.href ? "opacity-100" : "opacity-40 group-hover:opacity-100"} transition-opacity`}>{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="p-4 mt-auto">
            <div className="p-4 bg-slate-900/40 border border-[var(--surface-border)] rounded-2xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center font-bold text-[10px]">NP</div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate">Nexus Prime</p>
                  <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest truncate">Administrator</p>
                </div>
              </div>
              <Link href="/login" className="text-slate-600 hover:text-red-400 transition-colors p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <header className="h-16 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--surface-border)] flex items-center justify-between px-10 shrink-0 z-10">
            <div className="flex items-center gap-6">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {navigation.find((n) => n.href === pathname)?.name || sectorManagement.find((n) => n.href === pathname)?.name || "Dashboard"}
              </h2>
              <div className="h-4 w-[1px] bg-slate-800" />
              <DbStatusWidget />
            </div>
            <div className="flex items-center gap-8 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">SID:</span>
                <span className="text-slate-300">DOM-04</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">UTC:</span>
                <span className="font-mono text-[var(--accent-primary)] text-xs">24.05.26</span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-10 bg-[var(--background)]">
            <div className="max-w-6xl mx-auto space-y-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </BunkerProvider>
  );
}
