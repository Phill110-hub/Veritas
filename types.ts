
export interface AnalysisResult {
  type: 'WEB' | 'COMPARE';
  text: string;
  score: number; // 0-100
  sources: Array<{
    uri: string;
    title: string;
  }>;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}
