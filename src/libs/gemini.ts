import "server-only";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const GEMINI_FLASH_MODEL_NAME = "gemini-1.5-flash";

export const GEMINI_PRO_MODEL_NAME = "gemini-1.5-pro";

export const CV_SCORING_MODEL = model.getGenerativeModel(
  {
    model: GEMINI_FLASH_MODEL_NAME,
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        required: [
          "score",
          "matchingKeywords",
          "missingKeywords",
          "explanation",
        ],
        properties: {
          score: {
            type: SchemaType.NUMBER,
            description:
              "Matched CV Score with Job Description with range from 0 to 100",
            nullable: false,
          },
          matchingKeywords: {
            type: SchemaType.ARRAY,
            description: "List of matched keywords",
            nullable: false,
            items: {
              type: SchemaType.STRING,
              nullable: false,
              description: "Matched keywords",
            },
          },
          missingKeywords: {
            type: SchemaType.ARRAY,
            description: "List of missing keywords",
            nullable: false,
            items: {
              type: SchemaType.STRING,
              nullable: false,
              description: "Missing keywords",
            },
          },
          explanation: {
            type: SchemaType.STRING,
            nullable: false,
            description:
              "The result of evaluated cv and job description in markdown format",
          },
        },
      },
    },
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: "Act as a professional CV reviewer with 10 years of experience and an expert ATS (Applicant Tracking System) scanner",
        },
        {
          text: `
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
          `,
        },
        {
          text: "Feel free to include emojis where appropriate to enhance readability.",
        },
      ],
    },
  },
  { timeout: 60000 }
);

export const COVER_LETTER_MODEL = model.getGenerativeModel(
  {
    model: GEMINI_FLASH_MODEL_NAME,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 600,
    },
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: "Act as a job seeker who wants to apply for a job and need to write a cover letter for the job.",
        },
        {
          text: "You should be able to write a cover letter in the style of a job seeker.",
        },
        {
          text: `
          **Instructions:**
          - Write a cover letter in the style of a job seeker.
          - Include a brief introduction of yourself, including your name, educational background, and relevant work experience.
          - Explain why you are interested in this particular position and the company.
          - Describe your work experience, skills, and achievements that qualify you for the position.
          - Explain how your abilities and experiences can contribute positively to the company.
          - Provide specific examples or accomplishments if possible.
          - Express your interest in discussing your qualifications further during an interview.
          - Thank the reader for their time and consideration.
          - Include contact information. (if provided)
          `,
        },
        {
          text: `
          **Styles**
          - Ensure the language is formal, clear, and persuasive, with a well-organized structure and concise paragraphs.
          - Format the entire response in markdown using bullet points for each section.
          - give space between each section
          - make sure the cover letter is not too long
          `,
        },
      ],
    },
  },
  { timeout: 60000 }
);

export const CV_GENERATING_MODEL = model.getGenerativeModel({
  model: GEMINI_FLASH_MODEL_NAME,
  generationConfig: {
    temperature: 0.3,
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      required: [
        "tips",
        "generatedCv",
        "recomendationLinks",
        "keywords",
        "improvements",
      ],
      properties: {
        tips: {
          type: SchemaType.ARRAY,
          nullable: false,
          description: "Tips to improve CV",
          items: {
            type: SchemaType.STRING,
            nullable: false,
            description: "Resume Tips",
          },
        },
        recomendationLinks: {
          type: SchemaType.ARRAY,
          nullable: false,
          description: "Recomendation Link",
          items: {
            type: SchemaType.STRING,
            nullable: false,
            description:
              "Recomendation for user what link they should add (example: LinkedIn Profile, Github Profile, Personal Website, etc)",
          },
        },
        keywords: {
          type: SchemaType.ARRAY,
          nullable: false,
          description: "Recomendation keywords",
          items: {
            type: SchemaType.STRING,
            nullable: false,
            description: "Keyword that relevant to job description",
          },
        },
        generatedCv: {
          type: SchemaType.STRING,
          nullable: false,
          description:
            "Generated CV in markdown format with format (Title, Contact, Objective, Experience, Education, Project, Portfolio, Hard Skills, Soft Skills, Certificate, Languages)",
        },
        improvements: {
          type: SchemaType.ARRAY,
          nullable: false,
          description: "List of improvements have been made on cv",
          items: {
            type: SchemaType.STRING,
            nullable: false,
            description: "What have been improved from CV",
          },
        },
      },
    },
  },
  systemInstruction: {
    role: "system",
    parts: [
      {
        text: "Act as a professional resume writer or senior HR recruiter with 10 years of experience",
      },
      {
        text: "Your task is to personalized resume in MDX format (markdown formatted for PDF) based on the job description",
      },
      {
        text: "You can use current resume for context, but not include it in the result as possible",
      },
      {
        text: "Make sure the resume is not too long and fit in one page",
      },
      {
        text: "Include the most relevant sections from the CV that are most relevant to the job description.",
      },
      {
        text: `
        **Guidelines:**
        - **Analyze** the job description to extract relevant keywords, skills, and industry-specific language.
        - **Transform** the provided CV by aligning its content with the job description. Replace or enhance keywords to match those in the job description (format these keywords as ***bold and italic***).
        - **Incorporate** action verbs and quantifiable results where needed. If the CV lacks these, directly modify the text to include them—do not provide suggestions.
        - **Match** the language of the job description (if the job description is in English, use English).
        - **Ensure** the resume is concise, professional, and fits into a one-page PDF. compress the resume as much as possible, including removing unnecessary sections and paragraphs.
        - **Format** the resume using markdown with clear, bullet-pointed sections and **bold section titles**.
        `,
      },
      {
        text: `
        **Resume Format:**
        - **Title**
        - **Contact** (email, phone number, LinkedIn if provided)
        - **Objective:** A brief paragraph (2–3 sentences).
        - **Experience:** List relevant work experience with enhanced action verbs and quantifiable results (include only if applicable).
        - **Education:** Include relevant education details (for fresh graduates, place this section before Experience).
        - **Project:** List relevant projects enhanced with action verbs and measurable outcomes (if provided).
        - **Portfolio:** Include if available and relevant.
        - **Hard Skills:** List technical skills with brief explanations, using action verbs (if provided and relevant).
        - **Soft Skills:** Group related skills (e.g., teamwork, leadership, communication) (if provided and relevant).
        - **Certificate:** List relevant certifications (if provided).
        - **Languages:** Include language proficiencies (if provided).
        `,
      },
    ],
  },
});
