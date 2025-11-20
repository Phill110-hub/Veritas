
import { AnalysisResult } from '../types';

// Credentials provided by user
const API_USER = 'phillyrick34@gmail.com';
const API_KEY = 'ir6oUGEsUNdKW6CzUNaesR1s5IkLPTuSeFeORzwZuUWrl7P76N-248869748';
const API_BASE = 'https://plagiarismsearch.com/api/v3';

// We use a CORS proxy to bypass the browser's Same-Origin Policy.
const CORS_PROXY = 'https://corsproxy.io/?';

const getAuthHeader = () => {
  return 'Basic ' + btoa(`${API_USER}:${API_KEY}`);
};

export const checkPlagiarismViaAPI = async (text: string): Promise<AnalysisResult> => {
  if (!text || text.length < 50) {
    throw new Error("PlagiarismSearch requires at least 50 characters.");
  }

  try {
    console.log("Initiating PlagiarismSearch API call via Proxy...");

    // 1. Create Report
    // We encode the target URL and append it to the proxy
    const createUrl = `${CORS_PROXY}${encodeURIComponent(`${API_BASE}/reports/create`)}`;
    
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ text: text })
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      console.error("API Create Failed:", errorText);
      throw new Error(`API Error (${createRes.status}): ${errorText}`);
    }

    const createData = await createRes.json();
    console.log("Report Created:", createData);

    const reportId = createData.data?.id;
    if (!reportId) {
      throw new Error("Failed to generate report ID from API response.");
    }

    // 2. Poll for Status
    let status = 'pending';
    let attempts = 0;
    const maxAttempts = 60; // Increased to 60 attempts (approx 2 minutes)
    
    while (status !== 'done' && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));
      
      // CACHE BUSTING: Add a timestamp to the target URL to prevent the proxy from returning cached "pending" responses.
      const targetStatusUrl = `${API_BASE}/reports/status/${reportId}?cb=${Date.now()}`;
      const statusUrl = `${CORS_PROXY}${encodeURIComponent(targetStatusUrl)}`;
      
      const statusRes = await fetch(statusUrl, {
        headers: { 'Authorization': getAuthHeader() }
      });
      
      if (!statusRes.ok) {
         console.warn("Status check failed, retrying...");
         attempts++;
         continue;
      }

      const statusData = await statusRes.json();
      status = statusData.data?.status || 'pending';
      console.log(`Polling status... ${status} (Attempt ${attempts + 1}/${maxAttempts})`);
      
      if (status === 'error') {
          throw new Error("Analysis failed on remote server (Status: Error).");
      }
      
      attempts++;
    }

    if (status !== 'done') {
      throw new Error(`Analysis timed out. Last status: ${status}. The service might be busy or the proxy is caching responses.`);
    }

    // 3. Fetch Report Details
    // Also add cache busting here just in case
    const reportTargetUrl = `${API_BASE}/reports/${reportId}?cb=${Date.now()}`;
    const reportUrl = `${CORS_PROXY}${encodeURIComponent(reportTargetUrl)}`;
    
    const reportRes = await fetch(reportUrl, {
      headers: { 'Authorization': getAuthHeader() }
    });
    
    if (!reportRes.ok) {
        throw new Error("Failed to fetch final report details.");
    }

    const reportData = await reportRes.json();
    const result = reportData.data;
    console.log("Final Report Data:", result);

    // Map to AnalysisResult
    // API returns similarity_score as percentage of Plagiarism.
    // We convert to Originality Score (100 - Plagiarism).
    const plagiarismScore = parseFloat(result.similarity_score) || 0;
    const originalityScore = Math.max(0, 100 - plagiarismScore);

    return {
      type: 'WEB',
      text: `Analysis via PlagiarismSearch.com completed.\nTotal Words: ${result.words_count || 0}`,
      score: Math.round(originalityScore), 
      sources: (result.relations || []).map((rel: any) => ({
        uri: rel.url,
        title: rel.title || rel.url,
      }))
    };

  } catch (error: any) {
    console.error("PlagiarismSearch API Error:", error);
    
    // Throw actual error so user sees it in UI
    throw new Error(error.message || "Failed to connect to PlagiarismSearch API.");
  }
};
