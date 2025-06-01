"use server";

import { CV_SCORING_MODEL } from "@/libs/gemini";
import { SCHEMA_CV_SCORING } from "../shared/schema";
import type { IScoringState } from "./schema";
import { scoringPrompt } from "@/libs/prompt";
import type { CVScoringResult } from "@/interfaces/ai";
import { verifyCsrfToken } from "@/libs/csrf";
import { Result } from "@/models";
import { v4 } from "uuid";
import { FEATURE, LANG } from "@/enums/global";
import { getServerSideSession } from "@/libs/session";
import { redirect } from "next/navigation";

export async function generateCvScoringAction(
  prevState: IScoringState & { parsed: boolean },
  formData: FormData
) {
  const csrf = formData.get("csrf") as string;
  if (!csrf || !verifyCsrfToken(csrf))
    return {
      ...prevState,
      error: "missing or invalid csrf token",
      errors: {},
    };

  const session = await getServerSideSession();
  if (!session || !session?.user?.id)
    redirect(`/${formData.get("lang") ?? LANG.EN}/sign-in`);

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

    await Result.create({
      id: v4(),
      feature: FEATURE.SCORING_CV,
      data: parsed,
      user_input: data,
      user_id: (await getServerSideSession())?.user?.id ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    });

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
