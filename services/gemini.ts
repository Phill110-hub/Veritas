import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkPlagiarism = async (text: string): Promise<AnalysisResult> => {
  if (!text || text.length < 10) {
    throw new Error("Please enter at least 10 characters to analyze.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following text for plagiarism and originality. 
      
      Text to analyze:
      "${text}"
      
      Task:
      1. Search the web to see if this text matches existing content.
      2. Provide a summary of your findings. Are there direct quotes? Is it paraphrased?
      3. Conclude with an estimated "Originality Score" from 0 to 100 (where 100 is completely original/unique).
      
      Format the output as a clear, concise report.`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const outputText = response.text || "No analysis generated.";
    
    // Extract grounding chunks (sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri && web.title)
      .map((web: any) => ({
        uri: web.uri,
        title: web.title,
      }));

    // Attempt to extract a score using regex from the text text if possible, 
    // otherwise default to a neutral calculation or 100 if no sources found.
    // This is a heuristic since we can't use JSON schema with Search Grounding.
    const scoreMatch = outputText.match(/Originality Score[:\s]*(\d+)/i);
    let score = scoreMatch ? parseInt(scoreMatch[1], 10) : (sources.length > 0 ? 50 : 100);

    // Remove duplicates from sources
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return {
      text: outputText,
      score,
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};