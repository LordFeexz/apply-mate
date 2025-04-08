import type { z } from "zod";
import type { ICoverLetter } from "../shared/schema";

export type IGenerateCoverLetterState = ICoverLetter & {
  response: string;
  errors: z.ZodError<ICoverLetter>["formErrors"]["fieldErrors"];
  error?: string;
};
