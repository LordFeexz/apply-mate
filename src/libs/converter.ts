import "server-only";
import MarkdownIt from "markdown-it";
import puppeter, { type Browser } from "puppeteer";

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
