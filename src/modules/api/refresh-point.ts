"use server";

import { GenerateProfile } from "@/models";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer "))
    return NextResponse.json(
      {
        message: "invalid or missing authorization",
        data: null,
        errors: null,
        code: 401,
      },
      { status: 401 }
    );

  const [, token] = authorization.split(" ");
  if (!token)
    return NextResponse.json(
      {
        message: "invalid or missing authorization",
        data: null,
        errors: null,
        code: 401,
      },
      { status: 401 }
    );

  if (token !== process.env.CRON_SECRET)
    return NextResponse.json(
      {
        message: "invalid or missing authorization",
        data: null,
        errors: null,
        code: 401,
      },
      { status: 401 }
    );

  await GenerateProfile.update({ points: 4.5 }, { where: {} });

  return NextResponse.json(
    {
      message: "ok",
      data: null,
      errors: null,
      code: 200,
    },
    { status: 200 }
  );
}
