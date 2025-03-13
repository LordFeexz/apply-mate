import { z } from "zod";

export const SCHEMA_FILE = z
  .instanceof(File, { message: "input must be a file" })
  .refine(
    (val) =>
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(val.type),
    { message: "file must be pdf, doc, or docx" }
  );

export const CV_STRING = z
  .string({
    required_error: "CV is required",
    invalid_type_error: "CV must be a string",
  })
  .min(50, { message: "CV must be at least 50 characters" });

export const SCHEMA_CV_SCORING = z.object({
  cv: z
    .string({
      required_error: "CV is required",
      invalid_type_error: "CV must be a string",
    })
    .min(50, { message: "CV must be at least 50 characters" }),
  jobDesc: z
    .string({
      required_error: "Job Description is required",
      invalid_type_error: "Job Description must be a string",
    })
    .min(50, { message: "Job Description must be at least 50 characters" }),
  lang: z.enum(["English", "Bahasa Indonesia"], {
    required_error: "Language is required",
    invalid_type_error: "Language must be a string",
  }),
});

export const SCHEMA_COVER_LETTER = z.object({
  cv: z
    .string({
      required_error: "CV is required",
      invalid_type_error: "CV must be a string",
    })
    .min(50, { message: "CV must be at least 50 characters" }),
  jobDesc: z
    .string({
      required_error: "Job Description is required",
      invalid_type_error: "Job Description must be a string",
    })
    .min(50, { message: "Job Description must be at least 50 characters" }),
  role: z
    .string({
      required_error: "Role is required",
      invalid_type_error: "Role must be a string",
    })
    .min(3, { message: "Role must be at least 3 characters" }),
  company: z
    .string({
      required_error: "Company is required",
      invalid_type_error: "Company must be a string",
    })
    .min(2, { message: "Company must be at least 2 characters" }),
  lang: z.enum(["English", "Bahasa Indonesia"], {
    required_error: "Language is required",
    invalid_type_error: "Language must be a string",
  }),
});

export type IFile = z.infer<typeof SCHEMA_FILE>;
export type ICoverLetter = z.infer<typeof SCHEMA_COVER_LETTER>;
export type IScoringSchema = z.infer<typeof SCHEMA_CV_SCORING>;
