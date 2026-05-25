"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "nexus-admin") {
      router.push("/dashboard");
    } else {
      setError("AUTHORIZATION DENIED: Invalid Administrative Credential");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070a] p-4 font-mono relative overflow-hidden">
      <div className="scanline" />
      
      {/* Tactical HUD Elements */}
      <div className="absolute top-4 left-4 text-[10px] text-emerald-500/30 font-bold uppercase tracking-widest hidden md:block">
        Terminal: NEXUS-PRIME-01 // Sector: DOM-04
      </div>
      <div className="absolute top-4 right-4 text-[10px] text-emerald-500/30 font-bold uppercase tracking-widest hidden md:block">
        Security Level: OMEGA // Status: ENFORCED
      </div>

      <div className="w-full max-w-lg tactical-card">
        <div className="mb-12 border-b border-emerald-500/10 pb-8 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                NexusCore
              </h1>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.2em]">
                  Governance Terminal
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 ml-1">
                Auth ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value="NEXUS-PRIME-01"
                  className="tactical-input opacity-40 border-dashed"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 ml-1">
                Security Key
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="[********]"
                className="tactical-input"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-950/20 border border-red-500/40 text-[11px] font-bold text-red-500 uppercase tracking-widest text-center animate-pulse">
              !! {error} !!
            </div>
          )}

          <button type="submit" className="btn-command w-full group">
            Authenticate
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
          <span>Property of DOM-04</span>
          <span className="text-emerald-500/20">V2.4.0-STABLE</span>
        </div>
      </div>

      {/* Footer HUD */}
      <div className="mt-8 text-[9px] text-zinc-700 font-bold uppercase tracking-[0.4em] flex gap-8">
        <span>[ENC: AES-256]</span>
        <span>[LINK: SECURE]</span>
        <span>[SYS: OPTIMAL]</span>
      </div>
    </div>
  );
}
