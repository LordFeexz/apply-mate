import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "pdfjs-dist/build/pdf.worker.min.mjs";
import { LANG, LANGS, PAYG_PAYMENT } from "@/enums/global";
import { PRICING, PRICING_DISCOUNT } from "@/enums/plan";
import sanitize from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidLang(raw: string) {
  return LANGS.includes(raw as LANG) ? (raw as LANG) : LANG.EN;
}

export function sanitizeString(str: string) {
  return sanitize(str, {
    allowedTags: [
      "img",
      "address",
      "article",
      "aside",
      "footer",
      "header",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hgroup",
      "main",
      "nav",
      "section",
      // Text content
      "blockquote",
      "dd",
      "div",
      "dl",
      "dt",
      "figcaption",
      "figure",
      "hr",
      "li",
      "main",
      "ol",
      "p",
      "pre",
      "ul",
      // Inline text semantics
      "a",
      "abbr",
      "b",
      "bdi",
      "bdo",
      "br",
      "cite",
      "code",
      "data",
      "dfn",
      "em",
      "i",
      "kbd",
      "mark",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "time",
      "u",
      "var",
      "wbr",
      // Table content
      "caption",
      "col",
      "colgroup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",
    ],
  });
}

export function getPAYGPrice(feature: PAYG_PAYMENT) {
  switch (feature) {
    case PAYG_PAYMENT.COVER_LETTER_GENERATE:
      return PRICING.COVER_LETTER - PRICING_DISCOUNT.COVER_LETTER;
    case PAYG_PAYMENT.CV_GENERATE:
      return PRICING.GENERATE_CV - PRICING_DISCOUNT.GENERATE_CV;
    case PAYG_PAYMENT.CV_SCORING:
      return PRICING.SCORING_CV - PRICING_DISCOUNT.SCORING_CV;
    case PAYG_PAYMENT.NONE:
      return PRICING.SUBSCRIPTION - PRICING_DISCOUNT.SUBSCRIPTION;
    default:
      return 0;
  }
}

export function formatText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join("\n")
    .replaceAll(/\s+/g, " ");
}

export function markdownToText(md: string) {
  return md
    .replaceAll(/^#{1,6}\s+/gm, "")
    .replaceAll(/(\*\*|__)(.*?)\1/g, "$2")
    .replaceAll(/(\*|_)(.*?)\1/g, "$2")
    .replaceAll(/`(.*?)`/g, "$1")
    .replaceAll(/```[\s\S]*?```/g, "")
    .replaceAll(/\[(.*?)\]\(.*?\)/g, "$1")
    .replaceAll(/!\[(.*?)\]\(.*?\)/g, "$1")
    .replaceAll(/^>\s+/gm, "")
    .replaceAll(/^(\s*[-*+]\s+)/gm, "");
}
