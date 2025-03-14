"use server";

import { CV_GENERATING_MODEL } from "@/libs/gemini";
import { SCHEMA_CV_GENERATE } from "../shared/schema";
import type { IGenerateCvState } from "./schema";
import { generateCvPrompt } from "@/libs/prompt";
import type { CVGeneratingResult } from "@/interfaces/ai";

export async function generateOptimizeCvAction(
  prevState: IGenerateCvState,
  formData: FormData
) {
  const { success, data, error } = await SCHEMA_CV_GENERATE.safeParseAsync({
    cv: formData.get("cv") as string,
    jobDesc: formData.get("jobDesc") as string,
  });

  if (!success)
    return {
      ...prevState,
      errors: error.formErrors.fieldErrors,
      error: "Bad Request",
    };

  try {
    const { response } = await CV_GENERATING_MODEL.generateContent(
      generateCvPrompt(data)
    );

    const parsed: CVGeneratingResult = JSON.parse(response.text());
    return {
      ...prevState,
      ...data,
      generatedCv: parsed.generatedCv,
      recomendationLinks: parsed.recomendationLinks,
      keywords: parsed.keywords,
      tips: parsed.tips,
    };
  } catch (err) {
    return { ...prevState, ...data, error: "unexpected error" };
  }
}
