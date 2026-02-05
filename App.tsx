import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PromptOptimizer } from './components/PromptOptimizer';
import { CourseViewer } from './components/CourseViewer';
import { Footer } from './components/Footer';
import { AppView } from './types';
import { BookOpen, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('optimizer');

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-primary-600 selection:text-white">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {currentView === 'optimizer' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-red-700 mb-2">
                Turn Ideas into Power Prompts
              </h1>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                PromptyOp uses advanced prompt engineering techniques to rewrite your raw inputs into 
                structured, high-context prompts optimized for LLMs like Gemini, Claude, and GPT.
              </p>
            </div>
            <PromptOptimizer />
          </div>
        )}

        {currentView === 'course' && (
          <div className="animate-fade-in">
             <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-white mb-2">
                Prompt Engineering Academy
              </h1>
              <p className="text-neutral-400">
                Master the art of communicating with Artificial Intelligence.
              </p>
            </div>
            <CourseViewer />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;