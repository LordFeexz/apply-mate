import "server-only";
import MarkdownIt from "markdown-it";
import puppeter, { type Browser } from "puppeteer";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import mammoth from "mammoth";
import "pdfjs-dist/build/pdf.worker.min.mjs";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

const md = new MarkdownIt();

const htmlMd = new MarkdownIt({
  breaks: true,
  linkify: true,
  html: true,
});

let browser: Browser | null = null;

async function getBrowser() {
  if (!browser)
    browser = await puppeter.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  return browser;
}

export async function mdToPdf(input: string) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setContent(mdToHtml(input));
  return page.pdf({ format: "A4" });
}

export function mdToHtml(input: string) {
  return md.render(input);
}

export function htmlToMd(input: string) {
  return htmlMd.render(input);
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
