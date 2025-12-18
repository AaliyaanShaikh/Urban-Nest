
import { GoogleGenAI } from "@google/genai";

export const askGeminiAboutRealEstate = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an elite luxury real estate advisor for Lumina Estates. Provide sophisticated, insightful, and concise answers. If asked about properties, focus on high-end features like smart home tech, sustainable materials, and architectural pedigree. Use an elegant tone.",
      }
    });
    return response.text || "I apologize, I'm currently unable to process that inquiry. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our concierge service is temporarily offline. Please reach out to our human agents.";
  }
};
