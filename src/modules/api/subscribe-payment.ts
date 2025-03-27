"use server";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) return new NextResponse(null, { status: 204 });

  if (!globalThis.subscribePaymentEvents)
    globalThis.subscribePaymentEvents = {};

  let interval: Timer | null = null;
  const stream = new ReadableStream({
    start(controller) {
      const res = {
        write: (data: string) => {
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
        },
        end: () => controller.close(),
      };

      globalThis.subscribePaymentEvents![userId] = res;
      interval = setInterval(() => {
        res.write(JSON.stringify({ message: "ping" }));
      }, 5000);
    },
    cancel() {
      interval && clearInterval(interval);
      delete globalThis.subscribePaymentEvents![userId];
    },
  });

  return new NextResponse(stream, {
    headers: new Headers({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    }),
  });
}
