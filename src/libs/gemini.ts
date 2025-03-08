import "server-only";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const GEMINI_FLASH_MODEL_NAME = "gemini-1.5-flash";

export const GEMINI_PRO_MODEL_NAME = "gemini-1.5-pro";

export const CV_SCORING_MODEL = model.getGenerativeModel({
  model: GEMINI_FLASH_MODEL_NAME,
  generationConfig: {
    temperature: 0.2,
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      required: ["score", "matchingKeywords", "missingKeywords", "explanation"],
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
});
