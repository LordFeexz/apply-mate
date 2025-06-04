import "server-only";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const GEMINI_FLASH_MODEL_NAME = "gemini-1.5-flash";

export const GEMINI_2_FLASH_MODEL_NAME = "gemini-2.0-flash";

export const GEMINI_PRO_MODEL_NAME = "gemini-1.5-pro";

export const GEMINI_2_5_FLASH_MODEL_NAME = "gemini-2.5-flash-preview-05-20";

export const CV_SCORING_MODEL = model.getGenerativeModel(
  {
    model: GEMINI_2_5_FLASH_MODEL_NAME,
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
    model: GEMINI_2_5_FLASH_MODEL_NAME,
    generationConfig: {
      temperature: 0.3,
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
  model: GEMINI_2_5_FLASH_MODEL_NAME,
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

export const CV_GENERATING_SPESIFIC_MODEL = model.getGenerativeModel(
  {
    model: GEMINI_2_5_FLASH_MODEL_NAME,
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      maxOutputTokens: 2750,
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
          generatedCv: {
            type: SchemaType.OBJECT,
            nullable: false,
            required: [
              "title",
              "contact",
              "objective",
              "experiences",
              "educations",
              "projects",
              "portfolios",
              "hardSkills",
              "softSkills",
              "certificates",
              "languages",
            ],
            properties: {
              title: {
                type: SchemaType.STRING,
                nullable: false,
                description: "Title of CV",
              },
              contact: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "Contact information of CV add contact information such as email, phone number, and LinkedIn profile URL if provided, but if not provided add [ADD YOUR CONTACT INFORMATION HERE]",
                items: {
                  type: SchemaType.OBJECT,
                  nullable: false,
                  properties: {
                    title: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Title of contact information",
                    },
                    url: {
                      type: SchemaType.STRING,
                      nullable: true,
                      description: "URL of contact information, if provided",
                    },
                  },
                },
              },
              objective: {
                type: SchemaType.STRING,
                nullable: false,
                description:
                  "Objective of CV, A brief paragraph (2–3 sentences) can be a summary or a description of your experience, skills, or other relevant information that sets you apart from others in the job market.",
              },
              experiences: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "The most Relevant experiences of CV, if not provided, return []",
                items: {
                  type: SchemaType.OBJECT,
                  nullable: false,
                  required: [
                    "company",
                    "description",
                    "role",
                    "startDate",
                    "endDate",
                    "responsibilities",
                  ],
                  properties: {
                    company: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "The name of the company",
                    },
                    description: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Description of Experience",
                    },
                    role: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description:
                        "Role of Experience, example: Fullstack Developer",
                    },
                    startDate: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Start Date of Experience",
                      format: "date-time",
                    },
                    endDate: {
                      type: SchemaType.STRING,
                      nullable: true,
                      description: "End Date of Experience",
                      format: "date-time",
                    },
                    responsibilities: {
                      type: SchemaType.ARRAY,
                      nullable: false,
                      description: "Responsibilities of Experience",
                      items: {
                        type: SchemaType.STRING,
                        nullable: false,
                        description: "Responsibility of Experience",
                      },
                    },
                  },
                },
              },
              educations: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "The most Relevant Educations of CV to job description, if not provided, return []",
                items: {
                  required: ["degree", "major", "school", "startDate"],
                  type: SchemaType.OBJECT,
                  nullable: false,
                  properties: {
                    degree: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Degree of Education",
                    },
                    major: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Major of Education",
                    },
                    school: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "School of Education",
                    },
                    startDate: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Start Date of Education",
                      format: "date-time",
                    },
                    endDate: {
                      type: SchemaType.STRING,
                      nullable: true,
                      description: "End Date of Education",
                      format: "date-time",
                    },
                  },
                },
              },
              projects: {
                type: SchemaType.OBJECT,
                nullable: false,
                description:
                  "The most Relevant Projects of CV to job description",
                required: ["title", "description", "startDate", "endDate"],
                properties: {
                  title: {
                    type: SchemaType.STRING,
                    nullable: false,
                    description: "Title of Project",
                  },
                  description: {
                    type: SchemaType.STRING,
                    nullable: false,
                    description: "Description of Project",
                  },
                  startDate: {
                    type: SchemaType.STRING,
                    nullable: false,
                    description: "Start Date of Project",
                    format: "date-time",
                  },
                  endDate: {
                    type: SchemaType.STRING,
                    nullable: true,
                    description: "End Date of Project",
                    format: "date-time",
                  },
                },
              },
              portfolios: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "The most Relevant List Portfolios URL of CV to job description",
                items: {
                  type: SchemaType.OBJECT,
                  nullable: false,
                  description:
                    "Relevant Portfolio URL of CV to job description",
                  required: ["title", "url"],
                  properties: {
                    title: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Title of Portfolio",
                    },
                    url: {
                      type: SchemaType.STRING,
                      nullable: true,
                      description: "URL of Portfolio",
                    },
                  },
                },
              },
              hardSkills: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "The Most Relevant Hard Skills of CV to job description",
                items: {
                  type: SchemaType.STRING,
                  nullable: false,
                  description: "Relevant Hard Skill of CV",
                },
              },
              softSkills: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "The Most Relevant Soft Skills of CV to job description",
                items: {
                  type: SchemaType.STRING,
                  nullable: false,
                  description: "Relevant Soft Skill of CV",
                },
              },
              certificates: {
                type: SchemaType.ARRAY,
                nullable: false,
                description:
                  "The Most Relevant Certificate of CV to job description",
                items: {
                  type: SchemaType.OBJECT,
                  nullable: false,
                  description: "Certificate of CV",
                  required: ["name", "date"],
                  properties: {
                    name: {
                      type: SchemaType.STRING,
                      nullable: false,
                      description: "Name of Certificate",
                    },
                    date: {
                      type: SchemaType.STRING,
                      nullable: true,
                      description: "Date of Certificate",
                      format: "date-time",
                    },
                  },
                },
              },
              languages: {
                type: SchemaType.ARRAY,
                nullable: false,
                description: "Languages Section of CV",
                items: {
                  type: SchemaType.STRING,
                  nullable: false,
                  description: "Language of CV",
                },
              },
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
          text: "Make sure the resume is not too long and fit in one page (about 6000-7000 characters)",
        },
        {
          text: "Include the most relevant part of sections from the CV to the job description.",
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
  },
  { timeout: 60000 }
);
