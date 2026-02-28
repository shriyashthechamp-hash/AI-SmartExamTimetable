"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { NeuralBackground } from './NeuralBackground';

export function HeroSection({ onStart }: { onStart?: () => void }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Layer */}
      <NeuralBackground />
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cogniq-primary/30 bg-cogniq-primary/10 text-cogniq-cyan text-xs font-semibold tracking-widest mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cogniq-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cogniq-cyan"></span>
          </span>
          SYSTEM ONLINE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Mapping Understanding. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cogniq-primary to-cogniq-cyan glow-blue">
            Preventing Academic Dropout.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 font-light"
        >
          AI-powered cognitive intelligence for students. A mission control for learning, detecting conceptual instability before it becomes failure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={onStart} className="glass-panel bg-cogniq-primary/20 hover:bg-cogniq-primary/30 text-white border-cogniq-primary/50 px-8 py-4 rounded-lg font-bold text-lg transition-all glow-blue flex items-center justify-center gap-2 group">
            Begin Cognitive Scan
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
          <button className="glass-panel hover:bg-white/5 text-slate-300 border-white/10 px-8 py-4 rounded-lg font-medium text-lg transition-all">
            Institutional View
          </button>
        </motion.div>
      </div>

    </div>
  );
}
