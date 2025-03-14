import type { z } from "zod";
import type { IGeneratingSchema } from "../shared/schema";
import type { CVGeneratingResult } from "@/interfaces/ai";

export type IGenerateCvState = IGeneratingSchema &
  CVGeneratingResult & {
    errors: z.ZodError<IGeneratingSchema>["formErrors"]["fieldErrors"];
    error?: string;
  };
