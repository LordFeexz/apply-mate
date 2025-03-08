export interface CVScoringResult {
  score: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  explanation: string;
}
