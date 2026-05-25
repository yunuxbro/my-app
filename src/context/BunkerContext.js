"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const BunkerContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_NEXUS_API_URL || "http://localhost:3000";
const API_KEY = process.env.NEXT_PUBLIC_NEXUS_ADMIN_API_KEY || "NEXUS_DEMO_KEY_2026";

export function BunkerProvider({ children }) {
  const [policies, setPolicies] = useState([]);
  const [survivors, setSurvivors] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [quarantineEvents, setQuarantineEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const getHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    "X-Nexus-Api-Key": API_KEY,
  }), []);

  // --- FETCH DATA / VERIFY CONNECTION ---
  const fetchData = useCallback(async () => {
    try {
      setConnectionError(null);
      const headers = getHeaders();

      // Check if API Key is missing first
      if (!API_KEY) {
        throw new Error("SECURITY_KEY_MISSING: X-Nexus-Api-Key is not configured in environment.");
      }

      const [pRes, sRes, hRes, qRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/policies`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/survivors?limit=50`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/health-records`, { headers }).catch(() => ({ json: () => [], ok: true })),
        fetch(`${API_BASE_URL}/api/admin/quarantine-events`, { headers }).catch(() => ({ json: () => [], ok: true }))
      ]);

      // If main governance tables fail, we consider the DB disconnected
      if (!pRes.ok || !sRes.ok) {
        const errorMsg = `API_FAILURE: Policies(${pRes.status}) | Survivors(${sRes.status})`;
        throw new Error(errorMsg);
      }

      const [pData, sData, hData, qData] = await Promise.all([
        pRes.json().catch(() => []),
        sRes.json().catch(() => []),
        hRes.json ? hRes.json().catch(() => []) : [],
        qRes.json ? qRes.json().catch(() => []) : []
      ]);

      setPolicies(Array.isArray(pData) ? pData : []);
      setSurvivors(Array.isArray(sData) ? sData : []);
      setHealthRecords(Array.isArray(hData) ? hData : []);
      setQuarantineEvents(Array.isArray(qData) ? qData : []);
      setDbConnected(true); // Verification Successful
    } catch (error) {
      console.error("Governance Link Error:", error.message);
      setConnectionError(error.message);
      setDbConnected(false); // Verification Failed
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  // --- ACTIONS: POLICIES ---
  const addPolicy = async (policy) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/policies`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(policy),
      });
      if (res.ok) {
        const newPolicy = await res.json();
        setPolicies([newPolicy, ...policies]);
      }
    } catch (error) {
      console.error("Policy Creation Error:", error.message);
    }
  };

  const togglePolicyStatus = async (id) => {
    const policy = policies.find(p => p.id === id);
    const newStatus = policy.status === "Enforced" ? "Review" : "Enforced";
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/policies/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPolicies(policies.map(p => p.id === id ? { ...p, status: newStatus } : p));
      }
    } catch (error) {
      console.error("Policy Update Error:", error.message);
    }
  };

  const deletePolicy = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/policies/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) {
        setPolicies(policies.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Policy Purge Error:", error.message);
    }
  };

  // --- ACTIONS: CENSUS ---
  const addSurvivor = async (survivor) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/survivors`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(survivor),
      });
      if (res.ok) {
        const newSurvivor = await res.json();
        setSurvivors([...survivors, newSurvivor]);
      }
    } catch (error) {
      console.error("Survivor Registration Error:", error.message);
    }
  };

  const toggleSurvivorStatus = async (id) => {
    const survivor = survivors.find(s => s.id === id);
    const newStatus = survivor.status === "Active" ? "Quarantine" : "Active";
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/survivors/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSurvivors(survivors.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (error) {
      console.error("Survivor Update Error:", error.message);
    }
  };

  const deleteSurvivor = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/survivors/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) {
        setSurvivors(survivors.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error("Survivor Purge Error:", error.message);
    }
  };

  return (
    <BunkerContext.Provider value={{
      policies, addPolicy, togglePolicyStatus, deletePolicy,
      survivors, addSurvivor, toggleSurvivorStatus, deleteSurvivor,
      healthRecords, quarantineEvents,
      dbConnected, connectionError,
      loading, refreshData: fetchData
    }}>
      {children}
    </BunkerContext.Provider>
  );
}

export function useBunker() {
  const context = useContext(BunkerContext);
  if (!context) throw new Error("useBunker must be used within a BunkerProvider");
  return context;
}
