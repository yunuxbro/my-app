"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as actions from "@/app/actions";

const BunkerContext = createContext();

export function BunkerProvider({ children }) {
  const [policies, setPolicies] = useState([]);
  const [survivors, setSurvivors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      console.log("DEBUG: Initializing Governance Relay...");
      setConnectionError(null);
      
      const status = await actions.getDbStatus();
      console.log("DEBUG: System Status Received:", status);
      
      const [pData, sData] = await Promise.all([
        actions.fetchPolicies(),
        actions.fetchSurvivors()
      ]);
      
      console.log("DEBUG: Data Relay Complete.");

      setPolicies(Array.isArray(pData) ? pData : []);
      setSurvivors(Array.isArray(sData) ? sData : []);
      setDbConnected(status === 1); 
    } catch (error) {
      console.error("DEBUG: Governance Relay CRITICAL FAILURE:", error.message);
      setConnectionError(error.message);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 100);
    return () => clearTimeout(timer);
  }, [fetchData]);

  // --- ACTIONS: POLICIES ---
  const addPolicy = async (policy) => {
    const res = await actions.createPolicy(policy);
    if (res.success) {
      await fetchData();
    }
    return res;
  };

  const togglePolicyStatus = async (id) => {
    const policy = policies.find(p => p._id === id);
    const newStatus = policy.status === "Enforced" ? "Review" : "Enforced";
    const res = await actions.updatePolicy(id, { status: newStatus });
    if (res.success) {
      await fetchData();
    }
    return res;
  };

  const deletePolicy = async (id) => {
    const res = await actions.deletePolicy(id);
    if (res.success) {
      await fetchData();
    }
    return res;
  };

  // --- ACTIONS: CENSUS ---
  const addSurvivor = async (survivor) => {
    const res = await actions.createSurvivor(survivor);
    if (res.success) {
      await fetchData();
    }
    return res;
  };

  const toggleSurvivorStatus = async (id) => {
    const survivor = survivors.find(s => s._id === id);
    const newStatus = survivor.status === "Active" ? "Quarantine" : "Active";
    const res = await actions.updateSurvivor(id, { status: newStatus });
    if (res.success) {
      await fetchData();
    }
    return res;
  };

  const deleteSurvivor = async (id) => {
    const res = await actions.deleteSurvivor(id);
    if (res.success) {
      await fetchData();
    }
    return res;
  };

  return (
    <BunkerContext.Provider value={{
      policies, addPolicy, togglePolicyStatus, deletePolicy,
      survivors, addSurvivor, toggleSurvivorStatus, deleteSurvivor,
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
