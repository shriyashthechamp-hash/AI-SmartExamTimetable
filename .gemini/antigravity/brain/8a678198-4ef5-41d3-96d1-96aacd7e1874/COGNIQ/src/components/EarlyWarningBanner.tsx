import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function EarlyWarningBanner({ riskScore }: { riskScore: number }) {
  return (
    <AnimatePresence>
      {riskScore > 60 && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          className="w-full max-w-7xl mx-auto mb-6 bg-cogniq-warning/10 border border-cogniq-warning/30 rounded-lg p-4 flex items-start sm:items-center shadow-[0_4px_20px_rgba(245,158,11,0.1)] backdrop-blur-md relative z-20 overflow-hidden"
        >
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-cogniq-warning/20 flex items-center justify-center text-cogniq-warning border border-cogniq-warning/50">
               <AlertTriangle className="w-5 h-5 animate-pulse" />
             </div>
             <div>
               <h4 className="text-white font-bold tracking-wide">⚠ Cognitive Instability Detected</h4>
               <p className="text-slate-300 text-sm mt-0.5">Early Intervention Recommended</p>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
