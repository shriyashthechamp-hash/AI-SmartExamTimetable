import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AnswerRecord } from './assessmentData';
import { CognitiveTimeline } from './CognitiveTimeline';
import { EarlyWarningBanner } from './EarlyWarningBanner';
import { AnalysisDrawer } from './AnalysisDrawer';
import { Activity, BrainCircuit } from 'lucide-react';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [projectionSlider, setProjectionSlider] = useState(0);

  // --- SCORING LOGIC ---
  const totalQuestions = answers.length || 5;
  const correctCount = answers.filter(a => a.isCorrect).length;
  
  // Base values
  const baseMastery = Math.round((correctCount / totalQuestions) * 100);
  const baseStability = Math.round((correctCount / 5) * 100); 
  const baseRisk = 100 - baseMastery;

  // Apply potential recovery bump and projection multiplier
  const recoveryBump = isRecovering ? 15 : 0;
  const projectionBump = projectionSlider * 0.5;
  
  const overallMastery = Math.min(100, Math.round(baseMastery + recoveryBump + projectionBump));
  const stabilityIndex = Math.min(100, Math.round(baseStability + (isRecovering ? 10 : 0)));
  const riskScore = Math.max(0, 100 - overallMastery);
  
  const predictedDecline = (riskScore * 0.2).toFixed(1);
  const cci = Math.round((overallMastery * stabilityIndex) / 100);

  // Concept scores map (simulated based on answers)
  const conceptScores: Record<string, number> = {};
  answers.forEach(a => {
    // If recovering, boost weak scores
    const weakBump = (!a.isCorrect && isRecovering) ? 16 : 0;
    conceptScores[a.concept] = a.isCorrect ? 100 : Math.min(100, 30 + weakBump + projectionBump);
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
    <div className="w-full relative">
      <EarlyWarningBanner riskScore={riskScore} />
      
      {isRecovering && (
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-7xl mx-auto mb-6 bg-cogniq-cyan/10 border border-cogniq-cyan/30 text-cogniq-cyan rounded-lg p-3 text-center font-bold tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur flex justify-center items-center gap-2"
        >
          <Activity className="w-5 h-5 animate-pulse" />
          COGNITIVE RECOVERY MODE ACTIVATED
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-left"
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Network Diagram Simulation */}
          <div className="glass-panel p-6 h-[400px] relative overflow-hidden flex flex-col group/network">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4 z-20">Neural Concept Network</h3>
            <div className="absolute inset-0 flex items-center justify-center">
               
               {/* Lines connecting nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Dependency thickness logic based on scores */}
                {[
                  { x2: '25%', y2: '30%', delay: 0, active: conceptScores[answers[0]?.concept] > 50 },
                  { x2: '75%', y2: '30%', delay: 0.2, active: conceptScores[answers[1]?.concept] > 50 },
                  { x2: '25%', y2: '70%', delay: 0.4, active: conceptScores[answers[2]?.concept] > 50 },
                  { x2: '75%', y2: '70%', delay: 0.6, active: conceptScores[answers[3]?.concept] > 50 }
                ].map((line, i) => (
                  <motion.line 
                    key={i}
                    x1="50%" y1="50%" x2={line.x2} y2={line.y2} 
                    stroke={line.active ? "rgba(6, 182, 212, 0.4)" : "rgba(255,255,255,0.05)"} 
                    strokeWidth={line.active ? "4" : "1"} 
                    initial={{ pathLength: 0 }} 
                    animate={{ pathLength: 1 }} 
                    transition={{ duration: 1, delay: line.delay }} 
                    className="transition-all duration-500 ease-in-out group-hover/network:stroke-[rgba(6,182,212,0.6)]"
                  />
                ))}
              </svg>
              
              {/* Center Node (Overall) */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute w-28 h-28 rounded-full bg-cogniq-bg border border-cogniq-primary flex items-center justify-center z-10 glow-blue text-white shadow-lg shadow-cogniq-primary/20 flex-col cursor-pointer hover:scale-110 transition-transform"
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
                const positions = [
                  { top: '30%', left: '25%', y: '-50%', x: '-50%' },
                  { top: '30%', left: '75%', y: '-50%', x: '-50%' },
                  { top: '70%', left: '25%', y: '-50%', x: '-50%' },
                  { top: '70%', left: '75%', y: '-50%', x: '-50%' },
                ];
                const pos = positions[idx];
                const size = 60 + (score * 0.4);
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.1), type: "spring" }}
                    className="absolute rounded-full flex items-center justify-center border shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 z-20 group/node"
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
                       className="absolute inset-0 rounded-full border border-white/10 group-hover/node:border-white/40 transition-colors" 
                    />
                    <div className="text-center transition-transform group-hover/node:scale-110">
                      <div className="font-bold text-white text-sm"><AnimatedNumber value={score} />%</div>
                    </div>
                    <div className="absolute -bottom-6 whitespace-nowrap text-xs text-slate-300 font-medium bg-black/50 px-2 py-0.5 rounded backdrop-blur opacity-80 group-hover/node:opacity-100 group-hover/node:text-white transition-all">
                      {ans.concept}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Predictive & AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 border-l-2 border-l-cogniq-cyan relative overflow-hidden flex flex-col justify-between">
               <div className="absolute opacity-10 top-2 right-2 font-mono text-8xl leading-none text-cogniq-cyan pointer-events-none">AI</div>
              <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">AI Scan Synthesis</h3>
              <div className="space-y-4 text-slate-300 relative z-10 flex-grow">
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
              
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="relative z-10 mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/20 py-3 px-4 rounded transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group"
              >
                <BrainCircuit className="w-4 h-4 text-cogniq-cyan group-hover:animate-pulse" />
                View Cognitive Analysis
              </button>
            </div>

            <div className="glass-panel p-6 border-l-2 border-l-cogniq-danger flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-cogniq-danger/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">Predictive Impact</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  If no intervention occurs, projected performance decline over 30 days:
                </p>
                <div className="text-5xl font-bold text-cogniq-danger mt-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                   <AnimatedNumber value={parseFloat(predictedDecline)} />%
                </div>
              </div>
              <button 
                onClick={() => setIsRecovering(true)}
                disabled={isRecovering}
                className="relative z-10 mt-6 bg-cogniq-danger/10 hover:bg-cogniq-danger disabled:opacity-50 disabled:cursor-not-allowed text-white border border-cogniq-danger/50 py-3 px-4 rounded transition-all text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              >
                 {isRecovering ? 'Stabilizing...' : 'Begin Reinforcement'}
              </button>
            </div>
          </div>
          
          {/* New Element: Cognitive Timeline */}
          <CognitiveTimeline currentMastery={Math.round(overallMastery)} currentRisk={Math.round(riskScore)} />
          
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Live Mastery Panel */}
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase flex items-center gap-2">
                  Live Concept Mastery
               </h3>
               <span className="w-2 h-2 rounded-full bg-cogniq-success animate-pulse glow-success"></span>
            </div>
            
            <div className="space-y-5">
              {answers.map((ans, idx) => {
                const score = conceptScores[ans.concept];
                const nodeLevel = getRiskLevel(100 - score);
                return (
                  <div key={idx} className="group cursor-default">
                    <div className="flex justify-between text-sm mb-1.5 align-baseline">
                      <span className="text-slate-300 tracking-wide">{ans.concept}</span>
                      <span className={`font-bold transition-colors duration-500 ${nodeLevel.color}`}><AnimatedNumber value={score}/>%</span>
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
          <div className="glass-panel p-6 flex flex-col items-center relative overflow-hidden">
            {/* Projection Slider integrated here */}
            <div className="w-full absolute top-0 left-0 right-0 h-1 bg-white/5">
               <input 
                 type="range" 
                 min="0" max="100" 
                 value={projectionSlider} 
                 onChange={(e) => setProjectionSlider(Number(e.target.value))}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 title="Drag to simulate Practice Intensity"
               />
               <motion.div className="h-full bg-cogniq-primary glow-blue transition-all" style={{ width: `${projectionSlider}%` }} />
            </div>
            {projectionSlider > 0 && (
              <div className="absolute top-2 text-[10px] text-cogniq-primary font-mono tracking-widest w-full text-center pointer-events-none">
                SIMULATING INTENSITY: {projectionSlider}%
              </div>
            )}

            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-6 mt-4 self-start w-full border-b border-white/10 pb-4">Risk Assessment</h3>
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
                    transition={{ duration: 1.5, ease: "easeOut" }}
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

          {/* New Element: Cognitive Confidence Index */}
          <div className="glass-panel p-6 border-l-2 border-cogniq-primary">
              <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-2">Cognitive Confidence Index</h3>
              <div className="flex items-end gap-3 mb-3">
                  <span className="text-5xl font-thin font-mono text-white"><AnimatedNumber value={cci}/></span>
              </div>
              <div className="h-0.5 w-full bg-black/60 overflow-hidden rounded-full">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${cci}%` }}
                     transition={{ duration: 1.2, delay: 0.4 }}
                     className="h-full bg-cogniq-primary glow-blue"
                  />
              </div>
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
      
      {/* Drawer Overlay */}
      <AnalysisDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        weakestConcept={weakestConcept} 
      />
    </div>
  );
}
