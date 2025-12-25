import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
// Vite automatically exposes variables prefixed with VITE_ from .env files
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const askGeminiAboutRealEstate = async (prompt: string): Promise<string> => {
  try {
    // Check if API key is configured
    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      console.error("Gemini API key is not configured");
      console.log("API_KEY value:", API_KEY ? `${API_KEY.substring(0, 10)}...` : 'empty');
      return "API key is not configured. Please set VITE_GEMINI_API_KEY in your .env.local file.";
    }

    console.log("Initializing Gemini API with key:", API_KEY.substring(0, 10) + '...');

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Get the model with system instruction
    // Try gemini-2.5-flash first (as requested), then fallback options
    const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash-exp", "gemini-1.5-flash"];
    let model;
    let lastError;
    
    for (const modelName of modelNames) {
      try {
        model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: "You are an elite luxury real estate advisor for Urban Nest. Provide sophisticated, insightful, and concise answers. If asked about properties, focus on high-end features like smart home tech, sustainable materials, and architectural pedigree. Use an elegant tone."
        });
        console.log(`Successfully initialized model: ${modelName}`);
        break;
      } catch (modelError: any) {
        console.log(`Model ${modelName} failed:`, modelError?.message);
        lastError = modelError;
        continue;
      }
    }
    
    if (!model) {
      throw new Error(`Failed to initialize any model. Last error: ${lastError?.message || 'Unknown'}`);
    }

    console.log("Sending request to Gemini API...");

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Received response from Gemini API");
    
    if (!text) {
      console.error("Empty response from Gemini API");
      return "I apologize, I'm currently unable to process that inquiry. Please try again.";
    }
    
    return text;
  } catch (error: any) {
    // Log detailed error information
    console.error("Gemini API Error Details:", {
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
      code: error?.code,
      stack: error?.stack,
      fullError: error
    });
    
    // Provide more specific error messages
    if (error?.message?.includes('API_KEY') || error?.message?.includes('API key')) {
      return "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env.local file.";
    }
    if (error?.message?.includes('quota') || error?.message?.includes('429') || error?.status === 429) {
      return "API quota exceeded. Please try again later.";
    }
    if (error?.message?.includes('403') || error?.status === 403) {
      return "API access forbidden. Please check your API key permissions.";
    }
    if (error?.message?.includes('404') || error?.status === 404) {
      return "Model not found. The model name may be incorrect.";
    }
    if (error?.message?.includes('network') || error?.message?.includes('fetch') || error?.message?.includes('Failed to fetch')) {
      return `Network error: ${error?.message || 'Please check your internet connection and try again.'}`;
    }
    
    // Return detailed error message
    const errorMsg = error?.message || error?.toString() || 'Unknown error';
    console.error("Full error object:", error);
    return `Error: ${errorMsg}. Please check the console for more details.`;
  }
};
