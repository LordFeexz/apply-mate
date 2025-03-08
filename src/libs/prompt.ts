export interface CVScoringPromptProps {
  jobDesc: string;
  cv: string;
  lang: "Bahasa Indonesia" | "English";
}

export function scoringPrompt({ lang, jobDesc, cv }: CVScoringPromptProps) {
  return `
            Act as a professional CV reviewer with 10 years of experience and an expert ATS (Applicant Tracking System) scanner. Your task is to evaluate the provided CV against the job description and generate an ATS compatibility score with detailed recommendations.
            **Instructions:**
            - **Assess the CV** based on the provided job description and assign an **overall ATS score** (e.g., out of 100).
            - **Break down the evaluation** into relevant sections such as:
              - **Tools & Technologies**
              - **Technical Skills**
              - **Language & Communication**
              - **Experience & Achievements**
              - **Other Relevant Sections**
            - For each section, provide:
              - A **section score**
              - A brief, clear explanation for the score (simple and to the point)
              - A list of **recommendation keywords** that align with the job description along with suggestions for improvement
            - Provide an **overall recommendation summary** to help improve the CV’s ATS compatibility.
            - Format the entire response in markdown using bullet points for each section.
            - Use the language specified by \`${lang}\` for the response.
            - Feel free to include emojis where appropriate to enhance readability.
            ------------------------------------------------------------
            **Job Description:**
            ${jobDesc}
            ------------------------------------------------------------
            **CV:**
            ${cv}
            `;
}
