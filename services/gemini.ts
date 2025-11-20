
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
      contents: `Analyze the provided text for plagiarism and originality.
      
      Text to analyze:
      "${text}"
      
      Instructions:
      1. STRICTLY Search the web to see if this specific text appears online.
      2. Identify if the text is:
         - A direct copy (verbatim).
         - Paraphrased (rewritten but same ideas).
         - Original (unique content).
      3. If it matches a source, explicitly name the source in the summary.
      4. Conclude with an "Originality Score" from 0 (Completely Plagiarized) to 100 (Completely Original).
      
      Format the output as a professional detection report.`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1, // Lower temperature for more factual/analytical results
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
    const scoreMatch = outputText.match(/Originality Score[:\s]*(\d+)/i);
    
    // Heuristic: If sources are found but no score detected, penalize based on source count
    let calculatedScore = sources.length > 0 ? Math.max(0, 100 - (sources.length * 20)) : 100;
    
    let score = scoreMatch ? parseInt(scoreMatch[1], 10) : calculatedScore;

    // Remove duplicates from sources
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return {
      type: 'WEB',
      text: outputText,
      score,
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
