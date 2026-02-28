"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, AnswerRecord } from './assessmentData';
import { ResultsDashboard } from './ResultsDashboard';

type FlowState = 'form' | 'quiz' | 'analyzing' | 'results';

export function AssessmentFlow({ onComplete }: { onComplete?: () => void }) {
  const [currentState, setCurrentState] = useState<FlowState>('form');
  const [studentInfo, setStudentInfo] = useState({ name: '', class: '9', subject: 'Maths' });
  
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  // Navigation
  const goToQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentInfo.name.trim()) setCurrentState('quiz');
  };

  const handleAnswerSelect = (selectedIndex: number) => {
    const question = QUESTIONS[currentQuestionIndex];
    const newAnswer: AnswerRecord = {
      questionId: question.id,
      concept: question.concept,
      isCorrect: selectedIndex === question.correctAnswer
    };
    
    setAnswers([...answers, newAnswer]);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 400); // Small delay for visual feedback
    } else {
      setTimeout(() => setCurrentState('analyzing'), 400);
    }
  };

  // Auto transition from analyzing to results
  useEffect(() => {
    if (currentState === 'analyzing') {
      const timer = setTimeout(() => setCurrentState('results'), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  return (
    <div className="fixed inset-0 z-50 bg-cogniq-bg/95 flex items-center justify-center backdrop-blur-sm overflow-y-auto py-10 px-4">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: Student Info Form */}
        {currentState === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-8 w-full max-w-md relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-cogniq-primary/10 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-2xl font-bold text-white mb-6 tracking-wide relative z-10 text-center">
              Cognitive Initialization
            </h2>
            <form onSubmit={goToQuiz} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1 tracking-wider uppercase">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cogniq-primary/50 focus:ring-1 focus:ring-cogniq-primary/50 transition-all"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1 tracking-wider uppercase">Class</label>
                <select 
                  value={studentInfo.class}
                  onChange={(e) => setStudentInfo({ ...studentInfo, class: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cogniq-primary/50 focus:ring-1 focus:ring-cogniq-primary/50 transition-all appearance-none"
                >
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1 tracking-wider uppercase">Subject</label>
                <select 
                  value={studentInfo.subject}
                  onChange={(e) => setStudentInfo({ ...studentInfo, subject: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cogniq-primary/50 focus:ring-1 focus:ring-cogniq-primary/50 transition-all appearance-none"
                >
                  <option value="Maths">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-cogniq-primary/20 hover:bg-cogniq-primary/30 text-white border border-cogniq-primary/50 px-6 py-4 rounded-lg font-bold transition-all glow-blue">
                  Initialize Diagnostic
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 2: Diagnostic Questions */}
        {currentState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 rounded-full border border-cogniq-accent/30 bg-cogniq-accent/10 text-cogniq-accent text-xs font-semibold tracking-widest uppercase">
                {QUESTIONS[currentQuestionIndex].concept}
              </span>
              <span className="text-slate-400 font-medium tracking-wide">
                Q{currentQuestionIndex + 1}/{QUESTIONS.length}
              </span>
            </div>

            <div className="glass-panel p-8 mb-6">
               <h3 className="text-2xl text-white font-medium mb-8 leading-snug">
                 {QUESTIONS[currentQuestionIndex].text}
               </h3>

               <div className="space-y-3">
                 {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleAnswerSelect(idx)}
                     className="w-full text-left p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-cogniq-primary/10 hover:border-cogniq-primary/30 text-slate-200 hover:text-white transition-all duration-200 group"
                   >
                     <div className="flex items-center gap-4">
                       <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-cogniq-primary/50 text-sm font-medium text-slate-400 group-hover:text-cogniq-primary transition-colors">
                         {String.fromCharCode(65 + idx)}
                       </span>
                       <span className="text-lg">{option}</span>
                     </div>
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Loading / Analyzing */}
         {currentState === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-cogniq-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-cogniq-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-4 border-cogniq-cyan/50 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase animate-pulse glow-blue text-center">
              Analyzing Cognitive Patterns...
            </h2>
            <p className="text-slate-400 mt-2 font-light">Compiling mastery vectors and stability index</p>
          </motion.div>
        )}

        {/* STEP 4: Results Dashboard */}
        {currentState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full p-4 md:p-8"
          >
             <ResultsDashboard 
               answers={answers} 
               onRestart={() => {
                 setAnswers([]);
                 setCurrentQuestionIndex(0);
                 setCurrentState('form');
                 if (onComplete) onComplete();
               }} 
             />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
