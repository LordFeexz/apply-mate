"use server";

import { CV_SCORING_MODEL } from "@/libs/gemini";
import { SCHEMA_CV_SCORING } from "../shared/schema";
import type { IScoringState } from "./schema";
import { scoringPrompt } from "@/libs/prompt";
import type { CVScoringResult } from "@/interfaces/ai";

export async function generateCvScoringAction(
  prevState: IScoringState & { parsed: boolean },
  formData: FormData
) {
  const { success, data, error } = await SCHEMA_CV_SCORING.safeParseAsync({
    cv: formData.get("cv") as string,
    jobDesc: formData.get("jobDesc") as string,
    lang: formData.get("lang"),
  });

  if (!success)
    return {
      ...prevState,
      errors: error.formErrors.fieldErrors,
      error: "Bad Request",
    };

  try {
    const { response } = await CV_SCORING_MODEL.generateContent(
      scoringPrompt(data)
    );

    const parsed: CVScoringResult = JSON.parse(response.text());

    return {
      ...prevState,
      ...data,
      score: parsed.score,
      missingKeywords: parsed.missingKeywords,
      matchingKeywords: parsed.matchingKeywords,
      explanation: parsed.explanation,
      parsed: true,
    };
  } catch (err) {
    return { ...prevState, ...data, error: "unexpected error" };
  }
}
