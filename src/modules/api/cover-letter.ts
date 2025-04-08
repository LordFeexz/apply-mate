"use server";

import { NextResponse, type NextRequest } from "next/server";
import { SCHEMA_COVER_LETTER } from "../shared/schema";
import { COVER_LETTER_MODEL } from "@/libs/gemini";
import { coverLetterPrompt } from "@/libs/prompt";
import { getServerSideSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { LANG, PAYG_PAYMENT } from "@/enums/global";
import { getPAYGPrice } from "@/libs/utils";
import { GenerateProfile } from "@/models";
import { verifyCsrfToken } from "@/libs/csrf";
import { isRemainingPremium } from "@/libs/model-helper";

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("multipart/form-data"))
    return NextResponse.json(
      {
        code: 400,
        message: "Content Type must be multipart/form-data",
        data: null,
        errors: null,
      },
      { status: 400 }
    );

  const formData = await req.formData();
  const lang = formData.get("lang") ?? LANG.EN;
  const csrf = formData.get("csrf") as string;
  if (!csrf || !verifyCsrfToken(csrf))
    return NextResponse.json(
      {
        message: "missing or invalid csrf token",
        code: 403,
        data: null,
        errors: null,
      },
      { status: 403 }
    );

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const price = getPAYGPrice(PAYG_PAYMENT.COVER_LETTER_GENERATE);
  const generateProfile = await GenerateProfile.findOne({
    where: { user_id: session.user.id },
    raw: true,
    benchmark: true,
  });
  if (!generateProfile) redirect(`/${lang}/sign-in`);

  if (
    !generateProfile ||
    (generateProfile?.premium_end_date &&
      !isRemainingPremium(generateProfile.premium_end_date)) ||
    (!generateProfile?.premium_start_date &&
      !generateProfile?.premium_end_date &&
      +generateProfile?.points < price &&
      !generateProfile?.pay_as_you_go_payments?.some(
        (el) => el === PAYG_PAYMENT.COVER_LETTER_GENERATE
      ))
  )
    return NextResponse.json(
      {
        code: 400,
        message: "Unsufficient points",
        data: null,
        errors: null,
      },
      { status: 400 }
    );

  const { success, data, error } = await SCHEMA_COVER_LETTER.safeParseAsync({
    cv: formData.get("cv") as string,
    jobDesc: formData.get("jobDesc") as string,
    lang,
    role: formData.get("role") as string,
    company: formData.get("company") as string,
  });

  if (!success)
    return NextResponse.json(
      {
        code: 400,
        message: "Bad Request",
        errors: error.formErrors.fieldErrors,
        data: null,
      },
      { status: 400 }
    );

  try {
    const { stream } = await COVER_LETTER_MODEL.generateContentStream(
      coverLetterPrompt(data)
    );

    if (
      !generateProfile.premium_start_date ||
      !generateProfile.premium_end_date
    )
      await GenerateProfile.update(
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

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk) {
              const text = chunk.text()?.trim();
              if (!text) continue;
              const textChunk = encoder.encode(text);

              controller.enqueue(textChunk);
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    const decoder = new TextDecoder();
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk);
        controller.enqueue(encoder.encode(text));
      },
    });

    return new NextResponse(readableStream.pipeThrough(transformStream), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        errors: null,
        message: "AI is currently unavailable",
        data: null,
        code: 500,
      },
      { status: 500 }
    );
  }
}
