import type { z } from "zod";
import type { SCHEMA_CV_SCORING } from "../api/schema";
import type { CVScoringResult } from "@/interfaces/ai";

export type IScoringSchema = z.infer<typeof SCHEMA_CV_SCORING>;

export type IScoringState = IScoringSchema &
  CVScoringResult & {
    errors: z.ZodError<IScoringSchema>["formErrors"]["fieldErrors"];
    error?: string;
  };
