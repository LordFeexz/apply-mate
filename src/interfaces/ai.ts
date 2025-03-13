export interface CVScoringResult {
  score: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  explanation: string;
}

export interface CVGeneratingResult {
  tips: string[];
  generatedCv: string;
  recomendationLinks: string[];
  keywords: string[];
  improvements: string[];
}
