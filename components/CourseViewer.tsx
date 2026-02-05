import React, { useState } from 'react';
import { COURSE_MODULES } from '../constants';
import { ChevronDown, ChevronUp, Brain, GraduationCap, Layout, UserCircle } from 'lucide-react';

const iconMap = {
  basics: Brain,
  advanced: GraduationCap,
  structure: Layout,
  persona: UserCircle
};

export const CourseViewer: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(COURSE_MODULES[0].id);

  const toggleModule = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {COURSE_MODULES.map((module) => {
        const Icon = iconMap[module.icon];
        const isExpanded = expandedId === module.id;

        return (
          <div 
            key={module.id} 
            className={`bg-neutral-900 border transition-all duration-300 rounded-xl overflow-hidden ${
              isExpanded ? 'border-primary-600 shadow-lg shadow-primary-900/10' : 'border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${isExpanded ? 'bg-primary-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isExpanded ? 'text-white' : 'text-neutral-200'}`}>
                    {module.title}
                  </h3>
                  <p className="text-sm text-neutral-400">{module.shortDescription}</p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-primary-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-500" />
              )}
            </button>

            {isExpanded && (
              <div className="px-5 pb-6 animate-fade-in">
                <div className="prose prose-invert max-w-none text-neutral-300 text-sm mb-6">
                  {module.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-semibold text-xs uppercase tracking-wider mb-2">
                      ❌ Weak Prompt
                    </h4>
                    <p className="text-neutral-300 text-sm font-mono">{module.exampleBad}</p>
                  </div>
                  <div className="bg-green-950/20 border border-green-900/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold text-xs uppercase tracking-wider mb-2">
                      ✅ Optimized Prompt
                    </h4>
                    <p className="text-neutral-300 text-sm font-mono">{module.exampleGood}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};