import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AnswerRecord } from './assessmentData';

interface DashboardProps {
  answers: AnswerRecord[];
  onRestart: () => void;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOut cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [value]);

  return <span>{displayValue}</span>;
}

export function ResultsDashboard({ answers, onRestart }: DashboardProps) {
  // --- SCORING LOGIC ---
  const totalQuestions = answers.length || 5;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const overallMastery = Math.round((correctCount / totalQuestions) * 100);
  const stabilityIndex = Math.round((correctCount / 5) * 100); 
  const riskScore = 100 - overallMastery;
  const predictedDecline = (riskScore * 0.2).toFixed(1);

  // Concept scores map (simulated based on answers)
  const conceptScores: Record<string, number> = {};
  answers.forEach(a => {
    conceptScores[a.concept] = a.isCorrect ? 100 : 30;
  });

  const getRiskLevel = (score: number) => {
    if (score <= 30) return { label: 'Low', color: 'text-cogniq-success', colorHex: '#10B981' };
    if (score <= 60) return { label: 'Moderate', color: 'text-cogniq-warning', colorHex: '#F59E0B' };
    return { label: 'High', color: 'text-cogniq-danger', colorHex: '#EF4444' };
  };

  const riskLevel = getRiskLevel(riskScore);
  const weakestConcept = answers.find(a => !a.isCorrect)?.concept || 'None Found';
  const secondaryWeakness = answers.filter(a => !a.isCorrect && a.concept !== weakestConcept)[0]?.concept;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-left"
    >
      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Network Diagram Simulation */}
        <div className="glass-panel p-6 h-[400px] relative overflow-hidden flex flex-col">
          <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4 z-20">Neural Concept Network</h3>
          <div className="absolute inset-0 flex items-center justify-center">
             
             {/* Lines connecting nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <motion.line x1="50%" y1="50%" x2="25%" y2="30%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <motion.line x1="50%" y1="50%" x2="75%" y2="30%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.line x1="50%" y1="50%" x2="25%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
              <motion.line x1="50%" y1="50%" x2="75%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6 }} />
            </svg>
            
            {/* Center Node (Overall) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute w-28 h-28 rounded-full bg-cogniq-bg border border-cogniq-primary flex items-center justify-center z-10 glow-blue text-white shadow-lg shadow-cogniq-primary/20 flex-col"
            >
              <div className="flex items-baseline font-bold">
                 <span className="text-3xl"><AnimatedNumber value={overallMastery} /></span>
                 <span className="text-xl">%</span>
              </div>
              <span className="text-[10px] uppercase text-cogniq-cyan tracking-widest">Mastery</span>
            </motion.div>

            {/* Simulated Nodes around center */}
            {answers.slice(0, 4).map((ans, idx) => {
              const score = conceptScores[ans.concept];
              const nodeLevel = getRiskLevel(100 - score);
              // Calculate node positions based on the lines above
              const positions = [
                { top: '30%', left: '25%', y: '-50%', x: '-50%' },
                { top: '30%', left: '75%', y: '-50%', x: '-50%' },
                { top: '70%', left: '25%', y: '-50%', x: '-50%' },
                { top: '70%', left: '75%', y: '-50%', x: '-50%' },
              ];
              const pos = positions[idx];
              
              // Map score to node size (roughly 40px to 80px)
              const size = 60 + (score * 0.4);
              
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + (idx * 0.1), type: "spring" }}
                  className="absolute rounded-full flex items-center justify-center border shadow-lg cursor-pointer"
                  style={{ 
                    ...pos,
                    width: size, 
                    height: size, 
                    backgroundColor: `${nodeLevel.colorHex}20`,
                    borderColor: `${nodeLevel.colorHex}60`,
                    boxShadow: `0 0 15px ${nodeLevel.colorHex}40`
                  }}
                  title={ans.concept}
                >
                  <motion.div 
                     animate={{ scale: [1, 1.05, 1] }} 
                     transition={{ repeat: Infinity, duration: 2 + idx }}
                     className="absolute inset-0 rounded-full border border-white/10" 
                  />
                  <div className="text-center">
                    <div className="font-bold text-white text-sm"><AnimatedNumber value={score} />%</div>
                  </div>
                  <div className="absolute -bottom-6 whitespace-nowrap text-xs text-slate-300 font-medium bg-black/50 px-2 py-0.5 rounded backdrop-blur">
                    {ans.concept}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Predictive & AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 border-l-2 border-l-cogniq-cyan relative overflow-hidden">
             <div className="absolute opacity-10 top-2 right-2 font-mono text-8xl leading-none text-cogniq-cyan pointer-events-none">AI</div>
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">AI Scan Synthesis</h3>
            <div className="space-y-4 text-slate-300">
              <div className="bg-white/5 p-3 rounded-md border border-white/10">
                <p className="text-xs uppercase tracking-widest text-cogniq-danger mb-1 font-semibold">Primary Weakness</p>
                <p className="font-medium text-white text-lg">{weakestConcept}</p>
                 <p className="text-xs text-slate-400 mt-1">Requires immediate intervention to stabilize foundational concepts.</p>
              </div>
              
              {secondaryWeakness && (
               <div className="bg-white/5 p-3 rounded-md border border-white/5">
                <p className="text-xs uppercase tracking-widest text-cogniq-warning mb-1 font-semibold">Secondary Observation</p>
                <p className="font-medium text-slate-200">{secondaryWeakness}</p>
              </div>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 border-l-2 border-l-cogniq-danger flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-cogniq-danger/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">Predictive Impact</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                If no intervention occurs, projected performance decline over 30 days:
              </p>
              <div className="text-5xl font-bold text-cogniq-danger mt-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                 <AnimatedNumber value={parseFloat(predictedDecline)} />%
              </div>
            </div>
            <button className="relative z-10 mt-6 bg-cogniq-danger/10 hover:bg-cogniq-danger text-white border border-cogniq-danger/50 py-3 px-4 rounded transition-all text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]">
              Begin Reinforcement
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">
        
        {/* Live Mastery Panel */}
        <div className="glass-panel p-6">
          <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-6 flex items-center justify-between">
             Live Concept Mastery
             <span className="w-2 h-2 rounded-full bg-cogniq-success animate-pulse glow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
          </h3>
          <div className="space-y-5">
            {answers.map((ans, idx) => {
              const score = conceptScores[ans.concept];
              const nodeLevel = getRiskLevel(100 - score);
              return (
                <div key={idx} className="group cursor-default">
                  <div className="flex justify-between text-sm mb-1.5 align-baseline">
                    <span className="text-slate-300 tracking-wide">{ans.concept}</span>
                    <span className={`font-bold ${nodeLevel.color}`}><AnimatedNumber value={score}/>%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1.2, delay: 0.2 * idx, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: nodeLevel.colorHex, boxShadow: `0 0 8px ${nodeLevel.colorHex}` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Circular Risk Gauge */}
        <div className="glass-panel p-6 flex flex-col items-center">
          <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-6 self-start w-full border-b border-white/10 pb-4">Risk Assessment</h3>
          <div className="relative w-48 h-48 flex items-center justify-center -mt-2">
             <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <motion.circle 
                  cx="96" cy="96" r="80" 
                  fill="transparent" 
                  stroke={riskLevel.colorHex} 
                  strokeWidth="12" 
                  strokeDasharray="502"
                  strokeDashoffset="502"
                  initial={{ strokeDashoffset: 502 }}
                  animate={{ strokeDashoffset: 502 - (502 * riskScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 6px ${riskLevel.colorHex})` }}
                />
             </svg>
             <div className="absolute flex flex-col items-center justify-center">
                <div className="flex items-start text-white">
                   <span className="text-5xl font-black font-mono"><AnimatedNumber value={riskScore} /></span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">Risk Score</span>
             </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`mt-4 px-4 py-1.5 rounded-full border bg-black/30 font-bold uppercase tracking-widest text-sm`}
            style={{ color: riskLevel.colorHex, borderColor: `${riskLevel.colorHex}40` }}
          >
            {riskLevel.label} Level
          </motion.div>
        </div>

         {/* Stability Index */}
         <div className="glass-panel p-6">
             <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-2">Understanding Stability</h3>
             <div className="flex items-end gap-3 mb-3">
                 <span className="text-4xl font-bold text-white"><AnimatedNumber value={stabilityIndex}/>%</span>
             </div>
             <div className="h-1 w-full bg-black/60 overflow-hidden rounded-full">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stabilityIndex}%` }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full bg-cogniq-cyan glow-cyan"
                 />
             </div>
         </div>

      </div>
    </motion.div>
  );
}
