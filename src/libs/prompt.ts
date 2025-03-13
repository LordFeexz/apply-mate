import "server-only";

export interface CVScoringPromptProps {
  jobDesc: string;
  cv: string;
  lang: "Bahasa Indonesia" | "English";
}

export interface CoverLetterPromptProps extends CVScoringPromptProps {
  role: string;
  company: string;
}

export function scoringPrompt({ lang, jobDesc, cv }: CVScoringPromptProps) {
  return `
            Check the compatibility between the job description and the CV.
            Use the language specified by \`${lang}\` for the response.
            ------------------------------------------------------------
            **Job Description:**
            ${jobDesc}
            ------------------------------------------------------------
            **CV:**
            ${cv}
            `;
}

export function coverLetterPrompt({
  lang,
  jobDesc,
  cv,
  role,
  company,
}: CoverLetterPromptProps) {
  return `
    Write a professional and compelling cover letter for the position of ${role} at ${company}.:

    **Style**:
    Use the language specified by \`${lang}\` for the response.
    use markdown format
    only include the cover letter without any other text
    only add information given on the context
    
    **Context**:
    ---------------------------
    job description: ${jobDesc}
    ---------------------------
    cv: ${cv}
  `;
}

export function generateCvPrompt({ lang, jobDesc, cv }: CVScoringPromptProps) {
  return `
    Generate a CV that is suitable for the job description and CV provided.
    Use the language specified by \`${lang}\` for the response.
    ----------------------------------------------------------------------------
    **Job Description:**
    ${jobDesc}
    ----------------------------------------------------------------------------
    **CV:**
    ${cv}
    `;
}
