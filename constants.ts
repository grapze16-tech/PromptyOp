import { CourseModule, PromptTemplate } from "./types";

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "m1",
    title: "The Core Principles: Clarity & Context",
    shortDescription: "Understand why vague prompts fail and how context is king.",
    icon: "basics",
    content: "The most common reason for hallucinations or poor outputs is ambiguity. LLMs predict the next token based on probability. If you don't constrain the probability space with clear context, the model guesses. \n\n**Key Rule:** Never assume the AI knows 'what you mean'. Be explicit about the task, the context, and the desired outcome.",
    exampleBad: "Write a marketing email.",
    exampleGood: "Act as a senior marketing copywriter. Write a 150-word promotional email for a new organic coffee blend targeting health-conscious millennials. The tone should be energetic and sustainable."
  },
  {
    id: "m2",
    title: "Persona Adoption",
    shortDescription: "Assigning a role to the AI to specialize its knowledge base.",
    icon: "persona",
    content: "Telling the AI to 'Act as [Role]' shifts its internal weights to prioritize vocabulary, tone, and logic patterns associated with that profession. This is one of the cheapest ways to improve quality immediately.",
    exampleBad: "Explain quantum physics.",
    exampleGood: "Act as a Nobel Prize-winning physicist teaching a class of high school students. Explain quantum entanglement using a simple analogy involving dice."
  },
  {
    id: "m3",
    title: "Chain of Thought (CoT)",
    shortDescription: "Teaching the model to 'think' before it speaks.",
    icon: "structure",
    content: "For complex logical reasoning or math, ask the model to think step-by-step. This prevents the model from rushing to an incorrect conclusion by forcing it to generate intermediate reasoning steps.",
    exampleBad: "If I have 3 apples and eat one, then buy 5 more, how many do I have?",
    exampleGood: "Solve the following word problem. Let's think step by step. First, calculate the initial change. Then, add the new purchase. Finally, state the total."
  },
  {
    id: "m4",
    title: "Few-Shot Prompting",
    shortDescription: "Providing examples to guide the output format.",
    icon: "advanced",
    content: "Zero-shot means giving no examples. Few-shot means providing 1-3 examples of Input -> Desired Output. This is extremely powerful for formatting tasks (e.g., extracting JSON data or writing in a specific style).",
    exampleBad: "Extract the names from this text.",
    exampleGood: "Extract names from the text. \nExample 1: 'John went to the store.' -> ['John']\nExample 2: 'Alice and Bob met Eve.' -> ['Alice', 'Bob', 'Eve']\n\nTask: 'Mike called Sarah yesterday.' ->"
  }
];

export const MODEL_OPTIONS = [
  { value: 'gemini', label: 'Gemini (Google)' },
  { value: 'gpt4', label: 'GPT-4 (OpenAI)' },
  { value: 'claude', label: 'Claude 3.5 (Anthropic)' },
  { value: 'general', label: 'General / Universal' },
];