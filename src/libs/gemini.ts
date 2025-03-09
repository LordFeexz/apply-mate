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
          text: "Your task is to evaluate the provided CV against the job description and generate an ATS compatibility score with detailed recommendations",
        },
        {
          text: "Assess the CV** based on the provided job description and assign an **overall ATS score** (e.g., out of 100)",
        },
        {
          text: "**Break down the evaluation** into relevant sections such as: **Tools & Technologies**, **Technical Skills**, **Language & Communication**, **Experience & Achievements**, **Other Relevant Sections**",
        },
        {
          text: "- For each section, provide: **section score**, A brief, clear explanation for the score (simple and to the point)",
        },
        {
          text: "Provide an **overall recommendation summary** to help improve the CV’s ATS compatibility.",
        },
        {
          text: "Format the entire response in markdown using bullet points for each section.",
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
          text: "Write a cover letter in the style of a job seeker.",
        },
        {
          text: "Briefly introduce yourself (include your name, educational background, and relevant work experience).",
        },
        {
          text: "Explain why you are interested in this particular position and the company.",
        },
        {
          text: " Describe your work experience, skills, and achievements that qualify you for the position.",
        },
        {
          text: " Explain how your abilities and experiences can contribute positively to the company.",
        },
        {
          text: " Provide specific examples or accomplishments if possible.",
        },
        {
          text: " Express your interest in discussing your qualifications further during an interview.",
        },
        {
          text: " Thank the reader for their time and consideration.",
        },
        {
          text: " Include contact information. (if provided)",
        },
        {
          text: "Ensure the language is formal, clear, and persuasive, with a well-organized structure and concise paragraphs.",
        },
        {
          text: "Format the entire response in markdown using bullet points for each section.",
        },
        {
          text: "give space between each section",
        },
        {
          text: "make sure the cover letter is not too long",
        },
      ],
    },
  },
  { timeout: 60000 }
);
