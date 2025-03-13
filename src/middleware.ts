import { type NextMiddleware, NextResponse } from "next/server";
import { LANG, LANGS } from "./enums/global";

export const middleware: NextMiddleware = async (req) => {
  if (req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL(`/${LANG.EN}`, req.url));

  const paths = req.nextUrl.pathname.split("/");
  if (!LANGS.includes(paths[1] as LANG)) {
    paths[1] = LANG.EN;
    return NextResponse.redirect(new URL(paths.join("/"), req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher:
    "/:nextData(_next/data/[^/]+)?/:path((?!_next|api|.*\\.(?:png|jpg|jpeg|svg|gif|ico|webp|avif)).*){\\.json}?",
};
