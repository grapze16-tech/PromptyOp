import React from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 mt-12 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} PromptyOp. All rights reserved.</p>
          <p className="text-xs mt-1">Powered by Google Gemini</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2">
            <Twitter className="w-4 h-4" />
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};