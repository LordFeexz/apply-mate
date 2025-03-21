"use server";

import { NextResponse, type NextRequest } from "next/server";
import { SCHEMA_COVER_LETTER } from "../shared/schema";
import { COVER_LETTER_MODEL } from "@/libs/gemini";
import { coverLetterPrompt } from "@/libs/prompt";

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
  const { success, data, error } = await SCHEMA_COVER_LETTER.safeParseAsync({
    cv: formData.get("cv") as string,
    jobDesc: formData.get("jobDesc") as string,
    lang: formData.get("lang"),
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
