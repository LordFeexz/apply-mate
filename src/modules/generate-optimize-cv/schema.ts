import type { z } from "zod";
import type { IScoringSchema } from "../shared/schema";
import type { CVGeneratingResult } from "@/interfaces/ai";

export type IGenerateCvState = IScoringSchema &
  CVGeneratingResult & {
    errors: z.ZodError<IScoringSchema>["formErrors"]["fieldErrors"];
    error?: string;
  };
