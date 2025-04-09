import { LANG } from "@/enums/global";

export interface AboutUsPageDictionary {
  title: string;
  desc: string;
  features: string[];
}

const ABOUT_US_PAGE_DICTIONARY: Record<LANG, AboutUsPageDictionary> = {
  [LANG.EN]: {
    title: "About Us",
    desc: "We help job seekers create tailored CVs and cover letters that match specific job descriptions, increasing your chances of landing interviews.",
    features: [
      "CV optimization based on job descriptions",
      "Personalized cover letter generation",
      "Keyword matching to improve application relevance",
      "CV scoring to measure match with job requirements",
      "Professional formatting for all documents",
    ],
  },
  [LANG.ID]: {
    title: "Tentang Kami",
    desc: "Kami membantu pencari kerja membuat CV dan surat pengantar yang disesuaikan dengan deskripsi pekerjaan, meningkatkan peluang Anda mendapatkan pekerjaan impian Anda.",
    features: [
      "Optimasi CV berdasarkan deskripsi pekerjaan",
      "Pembuatan surat lamaran yang disesuaikan",
      "Pencocokan kata kunci untuk meningkatkan relevansi aplikasi",
      "Skoring CV untuk mengukur kesesuaian dengan persyaratan pekerjaan",
      "Formatting profesional untuk semua dokumen",
    ],
  },
};

export const getAboutUsPageDictionary = (lang: LANG) =>
  ABOUT_US_PAGE_DICTIONARY[lang] ?? ABOUT_US_PAGE_DICTIONARY[LANG.EN];
