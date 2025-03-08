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
