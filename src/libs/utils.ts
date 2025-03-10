import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import mammoth from "mammoth";
import sanitize from "sanitize-html";
import "pdfjs-dist/build/pdf.worker.min.mjs";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function extractTextFromPDF(buffer: Buffer<ArrayBufferLike>) {
  try {
    const pdfDocument = await getDocument({ data: buffer }).promise;
    const numPages = pdfDocument.numPages;
    let extractedText = "";

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      extractedText += textContent.items
        .map((item: any) => item.str)
        .join(" \n");
    }

    return extractedText;
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
