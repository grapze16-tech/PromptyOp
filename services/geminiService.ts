import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationResult, TargetModel } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize AI instance
const ai = new GoogleGenAI({ apiKey });

/**
 * Optimizes a raw user prompt using Gemini.
 */
export const optimizeUserPrompt = async (
  rawInput: string,
  targetModel: TargetModel
): Promise<OptimizationResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  // Define the schema for structured output to ensure reliable parsing
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      optimizedPrompt: {
        type: Type.STRING,
        description: "The rewritten, high-quality prompt."
      },
      explanation: {
        type: Type.STRING,
        description: "A brief explanation of why changes were made."
      },
      techniquesUsed: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of prompt engineering techniques applied (e.g., Persona, CoT, Delimiters)."
      }
    },
    required: ["optimizedPrompt", "explanation", "techniquesUsed"]
  };

  const systemPrompt = `
    You are PromptyOp, an elite Prompt Engineering Expert and AI Consultant. 
    Your goal is to take a user's raw, often vague request and transform it into a "Perfect Prompt" optimized for Large Language Models.
    
    Target Model Optimization: ${targetModel}
    
    Rules for Optimization:
    1. Clarity: Remove ambiguity.
    2. Context: Add necessary context inferred from the request.
    3. Persona: Assign a specific, relevant expert persona (e.g., "Act as a Senior Python Developer").
    4. Constraints: Define length, format, and tone constraints.
    5. Formatting: Use clear delimiters (###, ---) to separate instructions from data.
    6. Chain of Thought: If the task is complex, instruct the model to "think step by step".
    7. Hallucination Reduction: Instruct the model to rely on provided context or admit ignorance if unsure.

    Return the result in JSON format containing the optimized prompt, a short explanation, and the specific techniques you applied.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: rawInput,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly creative to infer intent, but structured
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini.");

    const parsed = JSON.parse(text);

    return {
      original: rawInput,
      optimized: parsed.optimizedPrompt,
      explanation: parsed.explanation,
      techniquesUsed: parsed.techniquesUsed
    };

  } catch (error) {
    console.error("Optimization error:", error);
    throw new Error("Failed to optimize prompt. Please try again.");
  }
};