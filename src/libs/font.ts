import { Sora, Manrope } from "next/font/google";

export const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const manrope = Manrope({
  subsets: ["latin", "greek"],
  variable: "--font-manrope",
});
