import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  statusColor?: 'success' | 'warning' | 'danger' | 'cyan';
}

export function MetricCard({
  title,
  value,
  trend,
  trendUp,
  icon: Icon,
  statusColor = 'cyan'
}: MetricCardProps) {
  
  const colorMap = {
    success: 'text-cogniq-success glow-[0_0_10px_rgba(16,185,129,0.3)]',
    warning: 'text-cogniq-warning glow-[0_0_10px_rgba(245,158,11,0.3)]',
    danger: 'text-cogniq-danger glow-[0_0_10px_rgba(239,68,68,0.3)]',
    cyan: 'text-cogniq-cyan glow-cyan'
  };

  const bgMap = {
    success: 'bg-cogniq-success/10',
    warning: 'bg-cogniq-warning/10',
    danger: 'bg-cogniq-danger/10',
    cyan: 'bg-cogniq-cyan/10'
  };

  return (
    <div className="glass-panel p-6 hover:border-white/10 transition-colors flex flex-col justify-between group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase">{title}</h3>
        <div className={`p-2 rounded-lg ${bgMap[statusColor]} ${colorMap[statusColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold tracking-tight text-white`}>
            {value}
          </span>
          {trend && (
            <span className={`text-sm font-medium ${trendUp ? 'text-cogniq-success' : 'text-cogniq-danger'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
        
        {/* Subtle decorative line */}
        <div className="h-px w-full bg-gradient-to-r from-cogniq-primary/50 to-transparent mt-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
}
