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

export interface ExperienceResult {
  company: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface EducationResult {
  degree: string;
  major: string;
  school: string;
  startDate: string;
  endDate: string;
}

export interface PortfolioResult {
  title: string;
  urL: string;
}

export interface ProjectResult {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface CertificateResult {
  name: string;
  date: string;
}

export interface CVSpesificGeneratingResult
  extends Omit<CVGeneratingResult, "generatedCv"> {
  generatedCv: {
    title: string;
    contact: PortfolioResult[];
    objective: string;
    experiences: ExperienceResult[];
    educations: EducationResult[];
    projects: ProjectResult[];
    portfolios: PortfolioResult[];
    hardSkills: string[];
    softSkills: string[];
    certificates: CertificateResult[];
    languages: string[];
  };
}
