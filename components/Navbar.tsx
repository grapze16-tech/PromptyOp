import React from 'react';
import { AppView } from '../types';
import { Sparkles, BookOpen, Cpu } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onViewChange('optimizer')}
        >
          <div className="bg-gradient-to-tr from-primary-600 to-red-800 p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
            PromptyOp
          </span>
        </div>

        <div className="flex gap-2 bg-black p-1 rounded-full border border-neutral-800">
          <button
            onClick={() => onViewChange('optimizer')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentView === 'optimizer'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Optimizer</span>
          </button>
          <button
            onClick={() => onViewChange('course')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentView === 'course'
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Academy</span>
          </button>
        </div>
      </div>
    </nav>
  );
};