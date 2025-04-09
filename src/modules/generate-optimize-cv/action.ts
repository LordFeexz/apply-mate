"use server";

import { CV_GENERATING_MODEL } from "@/libs/gemini";
import { SCHEMA_CV_GENERATE } from "../shared/schema";
import type { IGenerateCvState } from "./schema";
import { generateCvPrompt } from "@/libs/prompt";
import type { CVGeneratingResult } from "@/interfaces/ai";
import { getServerSideSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { LANG, PAYG_PAYMENT } from "@/enums/global";
import { GenerateProfile } from "@/models";
import { getPAYGPrice } from "@/libs/utils";
import { verifyCsrfToken } from "@/libs/csrf";
import { canGenerate } from "@/libs/business";

export async function generateOptimizeCvAction(
  prevState: IGenerateCvState,
  formData: FormData
): Promise<IGenerateCvState> {
  const lang = formData.get("lang") ?? LANG.EN;
  const csrf = formData.get("csrf") as string;
  if (!csrf || !verifyCsrfToken(csrf))
    return {
      ...prevState,
      error: "missing or invalid csrf token",
      errors: {},
    };

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const generateProfile = await GenerateProfile.findOne({
    where: { user_id: session.user.id },
    raw: true,
    benchmark: true,
  });
  if (!generateProfile) redirect(`/${lang}/sign-in`);

  if (!canGenerate(generateProfile, PAYG_PAYMENT.CV_GENERATE))
    return {
      ...prevState,
      errors: {},
      error: "unsufficient points",
    };

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
    if (
      !generateProfile.premium_start_date ||
      !generateProfile.premium_end_date
    ) {
      const price = getPAYGPrice(PAYG_PAYMENT.CV_GENERATE);
      GenerateProfile.update(
        generateProfile?.pay_as_you_go_payments?.some(
          (el) => el === PAYG_PAYMENT.CV_GENERATE
        )
          ? {
              pay_as_you_go_payments:
                generateProfile.pay_as_you_go_payments?.filter(
                  (el) => el !== PAYG_PAYMENT.CV_GENERATE
                ),
            }
          : {
              points: +generateProfile.points - price,
            },
        { where: { user_id: session.user.id } }
      );
    }

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
