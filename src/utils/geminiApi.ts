import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateVisualRepresentation } from './visualizer';
import type { VisualResponse } from './types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Warning: VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

export interface ProcessedResponse {
  type: 'text' | 'error' | 'combined';
  textContent: string;
  visualContent?: VisualResponse;
  error?: string;
}

export async function processQuery(query: string): Promise<ProcessedResponse> {
  try {
    if (!API_KEY) {
      throw new Error('API key is not configured. Please check your environment variables.');
    }

    if (!query.trim()) {
      throw new Error('Query cannot be empty');
    }

    const [textResponse, visualResponse] = await Promise.all([
      generateTextResponse(query),
      generateVisualRepresentation(query)
    ]);

    return {
      type: 'combined',
      textContent: textResponse,
      visualContent: visualResponse
    };
  } catch (error) {
    console.error('Error processing query:', error);
    return {
      type: 'error',
      textContent: '',
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

async function generateTextResponse(query: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(query);
    const response = await result.response;
    
    const text = response.text();
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    
    return text;
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? `Failed to generate text response: ${error.message}`
        : 'Failed to generate text response'
    );
  }
}