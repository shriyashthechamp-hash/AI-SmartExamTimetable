"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { useState } from 'react';
import { MetricCard } from "@/components/MetricCard";
import { Activity, Brain, ShieldAlert, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  return (
    <main className="min-h-screen relative selection:bg-cogniq-primary/30 selection:text-white">
      <Navbar />
      
      <HeroSection onStart={() => setIsAssessmentActive(true)} />

      {/* Intelligence Dashboard Preview Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 bg-cogniq-bg">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wide flex items-center gap-3">
            <span className="w-2 h-8 bg-cogniq-cyan rounded-full glow-cyan"></span>
            Intelligence Dashboard Preview
          </h2>
          <p className="text-slate-400 font-light">Real-time cognitive metrics at a glance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Overall Mastery" 
            value="84.2%" 
            trend="2.4%" 
            trendUp={true}
            icon={Brain}
            statusColor="cyan"
          />
          <MetricCard 
            title="Stability Index" 
            value="92.1%" 
            trend="1.1%" 
            trendUp={true}
            icon={Activity}
            statusColor="success"
          />
          <MetricCard 
            title="Academic Risk" 
            value="4.8%" 
            trend="0.5%" 
            trendUp={false}
            icon={ShieldAlert}
            statusColor="danger"
          />
          <MetricCard 
            title="Improvement Velocity" 
            value="1.2x" 
            trend="0.1x" 
            trendUp={true}
            icon={Zap}
            statusColor="warning"
          />
        </div>
        
        {/* Placeholder for the Neural Map */}
        <div className="mt-12 glass-panel p-8 h-96 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <Activity className="w-16 h-16 text-slate-600 mb-4 animate-pulse" />
          <h3 className="text-xl font-medium text-slate-300">Interactive Neural Concept Network</h3>
          <p className="text-sm text-slate-500 mt-2">Connecting cognitive nodes in real-time...</p>
        </div>

      </section>

      {isAssessmentActive && (
        <AssessmentFlow onComplete={() => setIsAssessmentActive(false)} />
      )}
    </main>
  );
}
