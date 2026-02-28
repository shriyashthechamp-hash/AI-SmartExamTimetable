import React from 'react';
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onToggleInstitutional?: () => void;
  isInstitutional?: boolean;
}

export function Navbar({ onToggleInstitutional, isInstitutional = false }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 rounded-none bg-cogniq-bg/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-cogniq-primary glow-blue" />
            <span className="text-xl font-bold tracking-wider text-white">COGNIQ</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#" className="hover:text-cogniq-cyan transition-colors text-sm font-medium tracking-wide">
                DASHBOARD
              </Link>
              <Link href="#" className="hover:text-cogniq-cyan transition-colors text-sm font-medium tracking-wide">
                DIAGNOSTICS
              </Link>
              <button 
                onClick={onToggleInstitutional}
                className="hover:text-cogniq-cyan transition-colors text-sm font-medium tracking-wide"
              >
                {isInstitutional ? 'STUDENT VIEW' : 'INSTITUTIONAL VIEW'}
              </button>
            </div>
          </div>
          <div>
            <button className="bg-cogniq-primary/10 hover:bg-cogniq-primary/20 text-cogniq-primary border border-cogniq-primary/50 px-4 py-2 rounded font-medium text-sm transition-all glow-blue">
              INITIALIZE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
