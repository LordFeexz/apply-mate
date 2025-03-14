"use server";

import { type NextRequest, NextResponse } from "next/server";
import { SCHEMA_CV_GENERATE } from "../shared/schema";
import { CV_GENERATING_SPESIFIC_MODEL } from "@/libs/gemini";
import { generateCvPrompt } from "@/libs/prompt";
import type { CVSpesificGeneratingResult } from "@/interfaces/ai";

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      {
        code: 400,
        message: "Content Type must be application/json",
        data: null,
        errors: null,
      },
      { status: 400 }
    );

  const { success, data, error } = await SCHEMA_CV_GENERATE.safeParseAsync(
    await req.json()
  );

  if (!success)
    return NextResponse.json(
      {
        code: 400,
        errors: error.formErrors.fieldErrors,
        message: "Bad Request",
        data: null,
      },
      { status: 400 }
    );

  try {
    const { response } = await CV_GENERATING_SPESIFIC_MODEL.generateContent(
      generateCvPrompt(data)
    );

    const parsed: CVSpesificGeneratingResult = JSON.parse(response.text());
    return NextResponse.json(
      {
        code: 200,
        errors: null,
        message: "Success",
        data: parsed,
      },
      { status: 200 }
    );
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
