
import { GoogleGenAI, Type } from "@google/genai";
import { TagResult } from "../types";

export const generateYouTubeSEO = async (keyword: string): Promise<TagResult> => {
  // Use a new instance to ensure we get the latest configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Act as a world-class YouTube SEO specialist and professional content writer.
  Your task is to generate high-performing metadata for a video titled or themed around: "${keyword}". 

  You MUST provide:
  1. **Description**: A professional, highly engaging, and SEO-optimized video description of AT LEAST 300 words. It should include a hook, detailed content overview, and call-to-actions.
  2. **Tags**: Exactly 20 high-ranking, trending long-tail keywords and short tags separated by commas.
  3. **Hashtags**: 10-15 trending viral hashtags starting with #.

  Rules:
  - All content MUST be in English.
  - The description MUST be professional and look like a top-tier influencer's video description.
  - Output MUST be valid JSON. No other text.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Upgraded to Pro for complex professional writing tasks
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactly 20 high-performing trending tags."
          },
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "10-15 trending hashtags."
          },
          description: {
            type: Type.STRING,
            description: "A professional 300+ word SEO optimized description."
          }
        },
        required: ["tags", "hashtags", "description"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) {
    throw new Error("No response received from AI.");
  }

  try {
    return JSON.parse(resultText) as TagResult;
  } catch (e) {
    console.error("JSON Parsing error:", e);
    throw new Error("Invalid response format from server. Please try again.");
  }
};
