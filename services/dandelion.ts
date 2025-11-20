
const DANDELION_API_KEY = '72c57aa3274043229671ae2be38d5281';
const DANDELION_API_URL = 'https://api.dandelion.eu/datatxt/sim/v1/';

export interface DandelionResponse {
  time: number;
  similarity: number; // 0.0 to 1.0
  lang: string;
  langConfidence: number;
}

export const checkSimilarity = async (text1: string, text2: string): Promise<number> => {
  if (!text1 || !text2) {
    throw new Error("Both text fields are required for comparison.");
  }

  try {
    // Dandelion expects parameters as query strings for GET requests or body for POST.
    // Using POST to handle larger text bodies.
    const params = new URLSearchParams();
    params.append('token', DANDELION_API_KEY);
    params.append('text1', text1);
    params.append('text2', text2);

    const response = await fetch(DANDELION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    const data: DandelionResponse = await response.json();
    
    // Return score as 0-100 integer
    return Math.round(data.similarity * 100);

  } catch (error) {
    console.error("Dandelion API Error:", error);
    throw error;
  }
};
