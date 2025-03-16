import { LANG } from "@/enums/global";

export interface LandingPageDictionary {
  badge: string;
  title: string;
  description: string;
  getStarted: string;
  learnMore: string;
  keyFeatures: string;
  keyTitle: string;
  keyDesc: string;
  howItWorks: string;
  howItWorksTitle: string;
  howItWorksDesc: string;
  successStory: string;
  successStoryTitle: string;
  successStoryDesc: string;
  pricing: string;
  pricingTitle: string;
  pricingDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  docs: string;
}

const LANDING_PAGE_DICTIONARY: Record<LANG, LandingPageDictionary> = {
  [LANG.EN]: {
    badge: "AI-Powered Job Application Tools",
    title: "Land Your Dream Job with Perfect Applications",
    description:
      "Create tailored CVs and cover letters that match job descriptions and increase your interview chances by up to 70%.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    keyFeatures: "Key Features",
    keyTitle: "AI-Powered CV Generator",
    keyDesc:
      "Create a professional CV tailored to specific job descriptions using advanced AI technology.",
    howItWorks: "How It Works",
    howItWorksTitle: "AI-Powered CV Generator",
    howItWorksDesc:
      "Create a professional CV tailored to specific job descriptions using advanced AI technology.",
    successStory: "Success Story",
    successStoryTitle: "AI-Powered CV Generator",
    successStoryDesc:
      "Create a professional CV tailored to specific job descriptions using advanced AI technology.",
    pricing: "Pricing",
    pricingTitle: "AI-Powered CV Generator",
    pricingDesc:
      "Create a professional CV tailored to specific job descriptions using advanced AI technology.",
    ctaTitle: "AI-Powered CV Generator",
    ctaDesc:
      "Create a professional CV tailored to specific job descriptions using advanced AI technology.",
    docs: "Docs",
  },
  [LANG.ID]: {
    badge: "Alat Pengembangan Karir AI",
    title: "Temukan Karir Impian Anda dengan Pengembangan Karir yang Ideal",
    description:
      "Buat CV dan surat lamaran yang sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang berkembang dan meningkatkan peluang Anda untuk mendapatkan pekerjaan impian Anda.",
    getStarted: "Mulai Sekarang",
    learnMore: "Pelajari Lebih Lanjut",
    keyFeatures: "Fitur Utama",
    keyTitle: "Generator CV AI",
    keyDesc:
      "Buat CV profesional sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang berkembang.",
    howItWorks: "Cara Kerja",
    howItWorksTitle: "Buat Material Aplikasi Profesional dengan 3 steps",
    howItWorksDesc:
      "Buat CV profesional sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang berkembang.",
    successStory: "Cerita Sukses",
    successStoryTitle: "Apa kata mereka?",
    successStoryDesc:
      "Buat CV profesional sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang berkembang.",
    pricing: "Harga",
    pricingTitle: "Pilih paket yang sesuai untukmu",
    pricingDesc:
      "Buat CV profesional sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang berkembang.",
    ctaTitle:
      "Fleksible sesuai dengan kebutuhan mu, mulai dari gratis sampai akses tak terbatas",
    ctaDesc:
      "Buat CV profesional sesuai dengan deskripsi pekerjaan menggunakan teknologi AI yang berkembang.",
    docs: "Dokumentasi",
  },
};

export const getDictionary = (lang: LANG) =>
  LANDING_PAGE_DICTIONARY[lang] ?? LANDING_PAGE_DICTIONARY[LANG.EN];
