"use server";

import { mdToPdf } from "@/libs/converter";
import { NextResponse, type NextRequest } from "next/server";
import { CV_STRING } from "../shared/schema";

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

  const { md } = await req.json();

  const { data, success, error } = await CV_STRING.safeParseAsync(md);
  if (!success)
    return NextResponse.json(
      {
        code: 400,
        message: "Bad Request",
        errors: { md: error.format()._errors },
        data: null,
      },
      { status: 400 }
    );

  return new NextResponse(
    new Blob([(await mdToPdf(data)) as BlobPart], { type: "application/pdf" }),
    {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
      status: 200,
    }
  );
}
