"use server";

import { FEATURE, LANG, PAYG_PAYMENT } from "@/enums/global";
import { SCHEMA_COVER_LETTER } from "../shared/schema";
import type { IGenerateCoverLetterState } from "./schema";
import { redirect } from "next/navigation";
import { getPAYGPrice } from "@/libs/utils";
import { sanitizeString } from "@/libs/sanitize";
import { getServerSideSession } from "@/libs/session";
import { GenerateProfile, Result } from "@/models";
import { verifyCsrfToken } from "@/libs/csrf";
import { COVER_LETTER_MODEL } from "@/libs/gemini";
import { coverLetterPrompt } from "@/libs/prompt";
import { canGenerate } from "@/libs/business";
import { v4 } from "uuid";

export async function generateCoverLetterAction(
  prevState: IGenerateCoverLetterState,
  formData: FormData
): Promise<IGenerateCoverLetterState> {
  const lang = formData.get("lang") ?? LANG.EN;
  const csrf = formData.get("csrf") as string;
  if (!csrf || !verifyCsrfToken(csrf))
    return {
      ...prevState,
      error: "missing or invalid csrf token",
    };

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const generateProfile = await GenerateProfile.findOne({
    where: { user_id: session.user.id },
    raw: true,
    benchmark: true,
  });
  if (!generateProfile) redirect(`/${lang}/sign-in`);

  if (!canGenerate(generateProfile, PAYG_PAYMENT.COVER_LETTER_GENERATE))
    return {
      ...prevState,
      error: "Unsufficient points",
    };

  const { success, data, error } = await SCHEMA_COVER_LETTER.safeParseAsync({
    cv: formData.get("cv") as string,
    jobDesc: formData.get("jobDesc") as string,
    lang,
    role: formData.get("role") as string,
    company: formData.get("company") as string,
  });

  if (!success)
    return {
      ...prevState,
      error: "Bad Request",
      errors: error.formErrors.fieldErrors,
    };

  try {
    const { response } = await COVER_LETTER_MODEL.generateContent(
      coverLetterPrompt(data)
    );

    if (
      !generateProfile.premium_start_date ||
      !generateProfile.premium_end_date
    ) {
      const price = getPAYGPrice(PAYG_PAYMENT.COVER_LETTER_GENERATE);
      GenerateProfile.update(
        generateProfile?.pay_as_you_go_payments?.some(
          (el) => el === PAYG_PAYMENT.COVER_LETTER_GENERATE
        )
          ? {
              pay_as_you_go_payments:
                generateProfile.pay_as_you_go_payments?.filter(
                  (el) => el !== PAYG_PAYMENT.COVER_LETTER_GENERATE
                ),
            }
          : {
              points: +generateProfile.points - price,
            },
        { where: { user_id: session.user.id } }
      );
    }

    const generated = sanitizeString(response.text());

    await Result.create({
      id: v4(),
      feature: FEATURE.GENERATE_COVER_LETTER,
      data: { generated },
      user_input: data,
      user_id: session.user.id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return {
      ...prevState,
      ...data,
      response: generated,
    };
  } catch (err) {
    return {
      ...prevState,
      ...data,
      error: "AI is currently unavailable",
    };
  }
}
