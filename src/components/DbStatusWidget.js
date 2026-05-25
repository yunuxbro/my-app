"use client";

import { useState, useEffect } from "react";
import * as actions from "@/app/actions";

export default function DbStatusWidget() {
  const [dbStatus, setDbStatus] = useState("CONNECTING");

  useEffect(() => {
    async function checkConnection() {
      try {
        const state = await actions.getDbStatus();
        if (state === 1) {
          setDbStatus("CONNECTED");
        } else if (state === 2) {
          setDbStatus("CONNECTING");
        } else {
          setDbStatus("DISCONNECTED");
        }
      } catch (err) {
        setDbStatus("DISCONNECTED");
      }
    }

    const interval = setInterval(checkConnection, 10000);
    checkConnection();
    return () => clearInterval(interval);
  }, []);

  if (dbStatus === "CONNECTING") {
    return (
      <div className="flex items-center gap-2 px-2 py-0.5 bg-zinc-900 border border-zinc-800">
        <span className="h-1 w-1 bg-amber-500 animate-pulse" />
        <span className="text-[7px] font-black text-amber-500 uppercase tracking-widest italic">Link_Pending</span>
      </div>
    );
  }

  if (dbStatus === "CONNECTED") {
    return (
      <div className="flex items-center gap-2 px-2 py-0.5 bg-zinc-900 border border-zinc-800">
        <span className="h-1 w-1 bg-emerald-500" />
        <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">Core_Link: Secured</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-2 py-0.5 bg-red-950/20 border border-red-900">
      <span className="h-1 w-1 bg-red-500 animate-ping" />
      <span className="text-[7px] font-black text-red-500 uppercase tracking-widest">Core_Link: Severed</span>
    </div>
  );
}
