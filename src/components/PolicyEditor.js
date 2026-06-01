"use client";

export default function PolicyEditor({
  policy,
  editBuffer,
  setEditBuffer,
  onSave,
  onCancel,
  isOpen,
  title = "Update Policy"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 tactical-border p-8 space-y-8 relative shadow-2xl">
        <button 
          onClick={onCancel}
          className="absolute top-6 right-6 text-zinc-700 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="space-y-2">
          <span className="text-[9px] font-black text-blue-600/60 uppercase tracking-[0.4em]">Sector_Directive_Override</span>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none italic">{title}</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2.5">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Protocol Title</label>
            <input 
              className="cyber-input w-full bg-zinc-900/50"
              value={editBuffer?.title || ""}
              onChange={(e) => setEditBuffer({...editBuffer, title: e.target.value})}
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1">Directive Parameters</label>
            <textarea 
              className="cyber-input w-full h-36 resize-none bg-zinc-900/50 leading-relaxed"
              value={editBuffer?.description || ""}
              onChange={(e) => setEditBuffer({...editBuffer, description: e.target.value})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-zinc-900">
          <button 
            onClick={onCancel}
            className="px-6 py-2 border border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:bg-zinc-900 transition-colors"
          >
            Abort
          </button>
          <button 
            onClick={onSave}
            className="px-10 py-3 bg-blue-600 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            Execute Update
          </button>
        </div>
      </div>
    </div>
  );
}
