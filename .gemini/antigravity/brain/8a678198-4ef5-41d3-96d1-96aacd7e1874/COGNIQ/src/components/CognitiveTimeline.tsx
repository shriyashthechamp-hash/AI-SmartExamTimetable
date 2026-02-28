import React from 'react';
import { motion } from 'framer-motion';

export function CognitiveTimeline({ currentMastery, currentRisk }: { currentMastery: number, currentRisk: number }) {
  // Simulated historical data
  const data = [
    { session: 'Session 1', mastery: 45, risk: 70 },
    { session: 'Session 2', mastery: 58, risk: 60 },
    { session: 'Session 3', mastery: currentMastery, risk: currentRisk }
  ];

  // Helper to calculate Y position on graph (0-100 down to 100-0 height)
  const getY = (val: number, height: number) => height - (val / 100) * height + 10;
  
  // X positions
  const getX = (index: number, width: number) => (index / (data.length - 1)) * width;

  return (
    <div className="glass-panel p-6 w-full animate-in fade-in" style={{ animationDelay: '500ms' }}>
      <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-6 flex items-center justify-between">
        Cognitive Signal Timeline
        <span className="text-xs text-cogniq-primary bg-cogniq-primary/10 px-2 py-0.5 rounded border border-cogniq-primary/30">LONGITUDINAL TRACKING</span>
      </h3>
      
      <div className="relative h-32 w-full mt-4">
        {/* Draw lines manually for high control over styling */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Mastery Line */}
          <motion.path
            d={`M 0 ${getY(data[0].mastery, 100)} L 50% ${getY(data[1].mastery, 100)} L 100% ${getY(data[2].mastery, 100)}`}
            fill="transparent"
            stroke="var(--color-cogniq-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(6,182,212,0.6))" }}
          />

          {/* Risk Line (Faint) */}
          <motion.path
            d={`M 0 ${getY(data[0].risk, 100)} L 50% ${getY(data[1].risk, 100)} L 100% ${getY(data[2].risk, 100)}`}
            fill="transparent"
            stroke="var(--color-cogniq-danger)"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            style={{ opacity: 0.5 }}
          />
        </svg>

        {/* Legend / Plot Points */}
        <div className="absolute inset-0 flex justify-between">
          {data.map((point, i) => (
            <div key={i} className="flex flex-col items-center justify-end h-full w-24 -ml-12 relative group pointer-events-none">
              
              {/* Plot dot for Mastery */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + (i * 0.2) }}
                className="absolute w-3 h-3 bg-cogniq-cyan rounded-full border-2 border-cogniq-bg z-10 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                style={{ top: getY(point.mastery, 100) - 6, left: '50%', transform: 'translateX(-50%)' }}
              >
                {i === 2 && <span className="absolute -top-1 -right-1 w-full h-full rounded-full animate-ping bg-cogniq-cyan opacity-75"></span>}
              </motion.div>

              {/* Data tags shown below */}
              <div className="absolute -bottom-10 flex flex-col items-center pointer-events-auto">
                 <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">{point.session}</span>
                 <div className="flex gap-2 text-[10px] font-mono">
                    <span className="text-cogniq-cyan">{point.mastery}%</span>
                    <span className="text-cogniq-danger/70">{point.risk}%</span>
                 </div>
              </div>

            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 w-full flex gap-4 text-xs justify-end text-slate-400 font-medium tracking-wide">
        <div className="flex items-center gap-1.5"><span className="w-3 h-1 bg-cogniq-cyan rounded-full"></span> Mastery</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-1 border-b-2 border-dashed border-cogniq-danger opacity-60"></span> Risk</div>
      </div>
    </div>
  );
}
