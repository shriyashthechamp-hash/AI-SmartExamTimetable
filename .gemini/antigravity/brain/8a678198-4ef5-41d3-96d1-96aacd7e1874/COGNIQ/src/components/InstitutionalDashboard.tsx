import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, AlertTriangle, BookOpen } from 'lucide-react';

export function InstitutionalDashboard() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wide flex items-center gap-3">
             <span className="w-2 h-8 bg-cogniq-primary rounded-full glow-blue"></span>
             Institutional Snapshot
          </h2>
          <p className="text-slate-400 font-light">Real-time aggregate cognitive metrics across all student cohorts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         {/* Aggregate Stats */}
         <div className="glass-panel p-6 border-l-2 border-cogniq-primary">
            <h3 className="text-slate-400 tracking-widest text-xs uppercase mb-4 flex items-center gap-2"><Users className="w-4 h-4"/> Active Scans</h3>
            <span className="text-4xl font-mono text-white">1,248</span>
         </div>
         <div className="glass-panel p-6 border-l-2 border-cogniq-success">
            <h3 className="text-slate-400 tracking-widest text-xs uppercase mb-4 flex items-center gap-2"><Activity className="w-4 h-4"/> Avg Cohort Mastery</h3>
            <span className="text-4xl font-mono text-white">76.4%</span>
         </div>
         <div className="glass-panel p-6 border-l-2 border-cogniq-danger">
            <h3 className="text-slate-400 tracking-widest text-xs uppercase mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Critical Risk Tier</h3>
            <span className="text-4xl font-mono text-white">12%</span>
         </div>
         <div className="glass-panel p-6 border-l-2 border-cogniq-warning">
            <h3 className="text-slate-400 tracking-widest text-xs uppercase mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4"/> Weakest Global Concept</h3>
            <span className="text-xl font-medium text-white block mt-2">Quadratic Roots</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Heatmap Placeholder */}
         <div className="glass-panel p-6 h-80 flex flex-col pt-8 items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cogniq-danger/10 to-cogniq-warning/5 pointer-events-none"></div>
            <Activity className="w-12 h-12 text-slate-500 mb-4 opacity-50" />
            <h3 className="text-slate-300 font-medium tracking-wide">Concept Attrition Heatmap</h3>
            <p className="text-slate-500 text-sm mt-2">Visualizing focal drop-off points...</p>
         </div>

         {/* Student Grid Placeholder */}
         <div className="glass-panel p-6 h-80 overflow-y-auto">
            <h3 className="text-slate-400 tracking-widest text-xs uppercase mb-4 sticky top-0 bg-[#111827] py-2 z-10 border-b border-white/5">At-Risk Student Grid</h3>
            <div className="space-y-3">
               {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-3 rounded flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-mono">{i+1}</div>
                        <div>
                           <p className="text-white text-sm font-medium">Student ID: {(Math.random() * 10000).toFixed(0)}</p>
                           <p className="text-slate-500 text-xs text-left">Grade 10 • Mathematics</p>
                        </div>
                     </div>
                     <span className="text-cogniq-danger font-mono text-sm">Risk: {60 + i * 5}%</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
