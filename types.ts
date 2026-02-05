export type AppView = 'optimizer' | 'course';

export type TargetModel = 'gemini' | 'gpt4' | 'claude' | 'general';

export interface OptimizationResult {
  original: string;
  optimized: string;
  explanation: string;
  techniquesUsed: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  exampleBad: string;
  exampleGood: string;
  icon: 'basics' | 'advanced' | 'structure' | 'persona';
}

export interface PromptTemplate {
  name: string;
  description: string;
  text: string;
}