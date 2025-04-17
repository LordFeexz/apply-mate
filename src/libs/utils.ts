import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import mammoth from "mammoth";
import sanitize from "sanitize-html";
import "pdfjs-dist/build/pdf.worker.min.mjs";
import { LANG, LANGS, PAYG_PAYMENT } from "@/enums/global";
import { PRICING, PRICING_DISCOUNT } from "@/enums/plan";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanText(text: string): string {
  return text
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function extractTextFromPDF(buffer: Buffer<ArrayBufferLike>) {
  try {
    const pdf = await getDocument({ data: buffer }).promise;
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const lines: string[] = [];
      let lastY: number | null = null;

      content.items.forEach((item) => {
        if ("transform" in item && "str" in item) {
          const [x, y] = item.transform.slice(-2);
          if (lastY !== null && Math.abs(y - lastY) > 5) {
            lines.push("\n");
          }
          lines.push(item.str);
          lastY = y;
        }
      });

      text += lines.join(" ") + "\n\n";
    }
    return text;
  } catch (err) {
    return null;
  }
}

export async function extractTextFromWord(buffer: Buffer<ArrayBufferLike>) {
  try {
    const result = await mammoth.extractRawText({
      buffer,
    });
    return result.value;
  } catch (err) {
    return null;
  }
}

export async function parseCV(file: File) {
  switch (file.type) {
    case "application/pdf":
      return extractTextFromPDF((await file.arrayBuffer()) as any);
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractTextFromWord((await file.arrayBuffer()) as any);
    default:
      return null;
  }
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

export function getLineDiff(oldText: string, newText: string) {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const diff: { type: "added" | "removed" | "unchanged"; content: string }[] =
    [];
  let i = 0,
    j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (
      i < oldLines.length &&
      j < newLines.length &&
      oldLines[i] === newLines[j]
    ) {
      diff.push({ type: "unchanged", content: oldLines[i] });
      i++;
      j++;
    } else if (
      j < newLines.length &&
      (i >= oldLines.length || oldLines[i] !== newLines[j])
    ) {
      diff.push({ type: "added", content: newLines[j] });
      j++;
    } else {
      diff.push({ type: "removed", content: oldLines[i] });
      i++;
    }
  }

  return diff;
}

export function formatText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join("\n")
    .replaceAll(/\s+/g, " ");
}

export function getValidLang(raw: string) {
  return LANGS.includes(raw as LANG) ? (raw as LANG) : LANG.EN;
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
