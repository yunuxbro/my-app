"use client";

import { useState, useEffect } from "react";
import * as actions from "@/app/actions";

export default function DbStatusWidget() {
  const [dbStatus, setDbStatus] = useState("CONNECTING");

  useEffect(() => {
    async function checkConnection() {
      try {
        // readystate: 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        const state = await actions.getDbStatus();
        
        if (state === 1) {
          setDbStatus("CONNECTED");
        } else if (state === 2) {
          setDbStatus("CONNECTING");
        } else {
          setDbStatus("DISCONNECTED");
        }
      } catch (err) {
        console.error("Unexpected Connection Fault:", err);
        setDbStatus("DISCONNECTED");
      }
    }

    const interval = setInterval(checkConnection, 5000);
    checkConnection();
    return () => clearInterval(interval);
  }, []);

  if (dbStatus === "CONNECTING") {
    return (
      <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 transition-all duration-500">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest italic">Linking Protocols...</span>
      </div>
    );
  }

  if (dbStatus === "CONNECTED") {
    return (
      <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 transition-all duration-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Nexus Core Link: Online</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full border border-red-100 transition-all duration-500">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-[ping_1s_infinite]" />
        <span className="text-[9px] font-black text-red-700 uppercase tracking-widest">Nexus Core Link: Offline</span>
      </div>
    </div>
  );
}
