import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, BrainCircuit, Activity } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  weakestConcept: string;
}

export function AnalysisDrawer({ isOpen, onClose, weakestConcept }: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cogniq-bg border-l border-white/10 p-6 z-50 md:p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                <BrainCircuit className="text-cogniq-cyan w-6 h-6" />
                Cognitive Analysis
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
               <div className="glass-panel p-5 border-l-2 border-l-cogniq-danger">
                 <h4 className="text-xs tracking-widest uppercase text-slate-400 mb-1">Detected Error Pattern</h4>
                 <p className="text-white font-medium text-lg leading-snug">
                   Consistent failure in applying algorithms for <span className="text-cogniq-danger">{weakestConcept}</span>.
                 </p>
               </div>

               <div className="glass-panel p-5">
                 <h4 className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-400 mb-2">
                   <Network className="w-4 h-4 text-cogniq-warning" />
                   Misconception Type
                 </h4>
                 <p className="text-slate-300">
                   Procedural. User understands the goal but fails at the intermediate execution steps, specifically substituting variables correctly.
                 </p>
               </div>

               <div className="glass-panel p-5 bg-cogniq-primary/5 border border-cogniq-primary/20">
                 <h4 className="text-xs tracking-widest uppercase text-cogniq-primary mb-2 font-bold">Recommended Micro-Intervention</h4>
                 <ul className="space-y-2 text-sm text-slate-300">
                   <li className="flex items-start gap-2">
                     <span className="text-cogniq-primary block mt-1">▪</span>
                     <span>Begin guided practice focusing exclusively on intermediate steps.</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-cogniq-primary block mt-1">▪</span>
                     <span>Provide visual node breakdown of the formula.</span>
                   </li>
                 </ul>
               </div>

               <div className="glass-panel p-5 flex items-center justify-between">
                 <div>
                   <h4 className="text-xs tracking-widest uppercase text-slate-400 mb-1">Engaged Recovery Time</h4>
                   <p className="text-white font-mono text-xl">12 - 15 mins</p>
                 </div>
                 <Activity className="text-cogniq-success w-8 h-8 opacity-80" />
               </div>

               <button 
                 onClick={onClose}
                 className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white font-medium tracking-wide py-4 rounded-lg transition-colors border border-white/10"
               >
                 Acknowledge & Close
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
