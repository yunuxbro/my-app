"use client";

import { useState, useEffect } from "react";
import * as actions from "@/app/actions";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    title: "", 
    domain: "Education", 
    severity: "Medium",
    status: "Review"
  });

  const loadPolicies = async () => {
    setLoading(true);
    try {
      const data = await actions.fetchPolicies();
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.createPolicy(formData);
      setFormData({ title: "", domain: "Education", severity: "Medium", status: "Review" });
      await loadPolicies();
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  const togglePolicyStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Enforced' ? 'Review' : 'Enforced';
    try {
      await actions.updatePolicy(id, { status: newStatus });
      await loadPolicies();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deletePolicy = async (id) => {
    try {
      await actions.deletePolicy(id);
      await loadPolicies();
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Policy Engine</h1>
        <p className="text-xl text-slate-500 font-medium italic">Define and enforce global directives across NexusCore domains.</p>
      </div>

      {/* Enhanced Draft Form */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <span className="h-8 w-1.5 bg-blue-600 rounded-full" />
          Draft New Policy
        </h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Directive Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                placeholder="e.g. Nutrient Rationing Protocol"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Domain</label>
                <select 
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 outline-none cursor-pointer appearance-none"
                >
                  <option>Harvesting</option>
                  <option>Pulse</option>
                  <option>Telecom</option>
                  <option>Education</option>
                  <option>Archive</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Severity</label>
                <select 
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-800 focus:bg-white focus:border-blue-500 outline-none cursor-pointer appearance-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-12 py-5 bg-slate-900 hover:bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
              Publish Directive to Domain
            </button>
          </div>
        </form>
      </section>

      {/* Registry Table */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Global Enforcement Registry</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{policies.length} Active Directives</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="py-6 px-10">Directive ID</th>
                <th className="py-6 px-6">Directive & Domain</th>
                <th className="py-6 px-6">Timestamp</th>
                <th className="py-6 px-6">Severity</th>
                <th className="py-6 px-6 text-center">Status</th>
                <th className="py-6 px-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-slate-400 font-bold italic">Initializing Atlas link to Directive Registry...</td>
                </tr>
              ) : policies.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-8 px-10 font-mono text-xs font-black text-slate-300 truncate max-w-[100px]">{p._id}</td>
                  <td className="py-8 px-6">
                    <p className="font-bold text-slate-800 text-lg">{p.title}</p>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-widest border border-blue-100 mt-1 inline-block">{p.domain}</span>
                  </td>
                  <td className="py-8 px-6 text-slate-400 font-medium text-xs">
                    {new Date(p.created_at).toLocaleString()}
                  </td>
                  <td className="py-8 px-6">
                    <span className={`text-xs font-black uppercase tracking-widest ${
                      p.severity === "Critical" ? "text-red-600" : p.severity === "High" ? "text-orange-600" : "text-slate-400"
                    }`}>
                      {p.severity}
                    </span>
                  </td>
                  <td className="py-8 px-6 text-center">
                    <button 
                      onClick={() => togglePolicyStatus(p._id, p.status)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all border-2 ${
                        p.status === "Enforced" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" 
                          : "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <button 
                      onClick={() => deletePolicy(p._id)}
                      className="p-2 text-slate-300 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
