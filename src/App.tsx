/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Book, 
  Scroll, 
  Clipboard, 
  Library, 
  Terminal, 
  Layers,
  Sparkles,
  Copy,
  Check,
  RefreshCcw,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Templates Initial CSS ---
const TEMPLATES = {
  Parchment: {
    name: "Pergamena Antica",
    icon: <Scroll size={18} />,
    css: `.artistic-div {
  width: 450px;
  min-height: 350px;
  background: #f4e4bc;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  position: relative;
  font-family: 'Cinzel', serif;
  color: #3e2723;
  border: 1px solid #d2b48c;
  /* Bordi "vissuti" con clip-path */
  clip-path: polygon(
    2% 2%, 98% 1%, 100% 15%, 98% 45%, 100% 85%, 98% 99%, 22% 98%, 0% 100%, 2% 50%, 0% 0%
  );
  background-image: 
    url('https://www.transparenttextures.com/patterns/old-map.png');
  text-shadow: 1px 1px 0px rgba(255,255,255,0.3);
}`,
    content: "L'antica conoscenza vive in queste righe dimenticate dal tempo."
  },
  Blackboard: {
    name: "Lavagna Ardesia",
    icon: <Library size={18} />,
    css: `.artistic-div {
  width: 500px;
  height: 350px;
  background: #1e231e;
  border: 10px solid #4e342e;
  border-radius: 4px;
  box-shadow: inset 0 0 80px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.5);
  padding: 40px;
  color: #ffffff;
  font-family: 'Indie Flower', cursive;
  font-size: 24px;
  line-height: 1.6;
  background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%);
  filter: contrast(1.1) brightness(0.9);
}`,
    content: "Creatività = Intelligenza che si diverte."
  },
  Notebook: {
    name: "Foglio di Quaderno",
    icon: <Clipboard size={18} />,
    css: `.artistic-div {
  width: 420px;
  height: 520px;
  background: white;
  background-image: 
    linear-gradient(#e1e8f0 1px, transparent 1px),
    linear-gradient(90deg, transparent 50px, #ff8080 50px, #ff8080 52px, transparent 52px);
  background-size: 100% 28px, 100% 100%;
  border: 1px solid #cbd5e1;
  box-shadow: 10px 10px 0px rgba(0,0,0,0.05);
  padding: 40px 40px 40px 80px;
  font-family: 'Caveat', cursive;
  font-size: 26px;
  color: #1e293b;
  transform: rotate(-1deg);
}`,
    content: "Le migliori idee nascono sempre su un foglio bianco..."
  },
  Blueprint: {
    name: "Progetto Tecnico",
    icon: <Layers size={18} />,
    css: `.artistic-div {
  width: 550px;
  height: 300px;
  background: #004d99;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 4px;
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
  mix-blend-mode: multiply;
}`,
    content: "Quantum Design Protocol"
  },
  Grimoire: {
    name: "Grimorio Magico",
    icon: <Book size={18} />,
    css: `.artistic-div {
  width: 420px;
  height: 550px;
  background: #3d1b1b;
  border: 1px solid #5a2e2e;
  border-left: 20px solid #2a1212;
  border-radius: 5px 20px 20px 5px;
  box-shadow: 20px 20px 60px rgba(0,0,0,0.5);
  display: flex;
  padding: 30px;
  color: #e0c097;
  position: relative;
  overflow: hidden;
}
.artistic-div::after {
  content: '◈';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  opacity: 0.05;
}`,
    content: "Incantesimi e Segreti."
  }
};

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof TEMPLATES>("Parchment");
  const [editableCss, setEditableCss] = useState(TEMPLATES["Parchment"].css);
  const [copied, setCopied] = useState(false);

  // Sync editor when template changes
  const switchTemplate = (key: keyof typeof TEMPLATES) => {
    setActiveTemplate(key);
    setEditableCss(TEMPLATES[key].css);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(editableCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* Header Centrale */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-black text-base tracking-tight text-slate-900 uppercase">Artistic.Box</h1>
            <span className="text-[10px] text-indigo-500 font-bold tracking-widest">LIVE DESIGN LAB</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-slate-100 p-1 rounded-lg border border-slate-200 mr-4">
             <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Editor v4.0</div>
          </div>
          <button 
            onClick={copyCode}
            className="flex items-center gap-2 h-10 px-6 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiato" : "Copia CSS"}
          </button>
        </div>
      </header>

      {/* Barra superiore dei Template */}
      <nav className="h-20 bg-white border-b border-slate-200 px-8 flex items-center gap-6 overflow-x-auto scrollbar-hide z-20 shrink-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap border-r border-slate-100 pr-6">Seleziona Base:</span>
        <div className="flex gap-3">
          {Object.entries(TEMPLATES).map(([key, data]) => (
            <button
              key={key}
              onClick={() => switchTemplate(key as any)}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-all group whitespace-nowrap border ${
                activeTemplate === key 
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md" 
                : "bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:bg-indigo-50"
              }`}
            >
              <span className={activeTemplate === key ? "text-white" : "text-indigo-500"}>
                {data.icon}
              </span>
              <span className="text-xs font-bold">{data.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Workspace: Editor e Preview Affiancati */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor (Sinistra) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0F172A] border-r border-slate-800">
          <div className="px-8 py-3 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">CSS_CONFIGURATION</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              spellCheck={false}
              value={editableCss}
              onChange={(e) => setEditableCss(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent p-10 font-mono text-sm leading-relaxed text-indigo-100/90 focus:outline-none resize-none scrollbar-hide selection:bg-indigo-500/40"
              placeholder="Inserisci il tuo CSS qui..."
            />
          </div>
          <div className="p-3 bg-indigo-600/5 text-center border-t border-white/5">
            <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-[0.3em]">Runtime_Sync_Active</p>
          </div>
        </div>

        {/* Preview (Destra) */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="px-8 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers size={14} className="text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Live_Preview</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">Workspace_Canvas</div>
          </div>
          
          <div className="flex-1 relative overflow-auto flex items-center justify-center studio-grid p-20">
            {/* Live Rendered Component */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTemplate}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {/* Live Style Injection */}
                <style>{editableCss}</style>
                <div className="artistic-div group">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-[2px] bg-current" />
                      <span className="text-xs uppercase font-black tracking-widest">Master_{activeTemplate}</span>
                    </div>
                    <p className="text-2xl font-medium leading-relaxed select-none">
                      {TEMPLATES[activeTemplate]?.content}
                    </p>
                    <div className="mt-12 pt-10 border-t border-current/10 flex justify-between items-center opacity-30">
                      <span className="text-xs font-mono font-bold tracking-widest uppercase">REF: {activeTemplate.slice(0,3)}-LAB</span>
                      <div className="flex gap-2">
                        {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Labels di posizionamento */}
            <div className="absolute top-10 right-10 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-widest select-none">Canvas_Boundaries</div>
          </div>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .studio-grid {
           background-color: #ffffff;
           background-image: 
            radial-gradient(circle at 1px 1px, #f1f5f9 2px, transparent 0);
           background-size: 40px 40px;
        }

        textarea::-webkit-scrollbar {
          width: 4px;
        }
        textarea::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
