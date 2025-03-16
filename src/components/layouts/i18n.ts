import { LANG } from "@/enums/global";

export interface HeaderDictionary {
  about: string;
  blog: string;
  organization: string;
  feature: string;
}

export interface FooterDictionary {
  privacy: string;
  term: string;
  desc: string;
  feature: string;
  organization: string;
  account: string;
}

export interface FeatureDictionary {
  desc: string;
}

const HEADER_DICTIONARY: Record<LANG, HeaderDictionary> = {
  [LANG.EN]: {
    about: "About",
    blog: "Blog",
    organization: "Our Organization",
    feature: "Feature",
  },
  [LANG.ID]: {
    about: "Tentang",
    blog: "Blog",
    organization: "Organisasi Kami",
    feature: "Fitur",
  },
};

const FOOTER_DICTIONARY: Record<LANG, FooterDictionary> = {
  [LANG.EN]: {
    privacy: "Privacy Policy",
    term: "Term of Service",
    desc: "Create professional CVs and cover letters tailored to specific job descriptions.",
    feature: "Feature",
    organization: "Organization",
    account: "Account",
  },
  [LANG.ID]: {
    privacy: "Kebijakan Privasi",
    term: "Syarat dan Ketentuan",
    desc: "Buat CV profesional dan surat lamaran yang sesuai dengan deskripsi pekerjaan tertentu.",
    feature: "Fitur",
    organization: "Organisasi",
    account: "Akun",
  },
};

const FEATURE_DICTIONARY: Record<LANG, FeatureDictionary> = {
  [LANG.EN]: {
    desc: "Optimize your job applications with our AI-powered tool",
  },
  [LANG.ID]: {
    desc: "Optimalkan pencarian pekerjaan Anda dengan AI",
  },
};

export const getHeaderDictionary = (lang: LANG) =>
  HEADER_DICTIONARY[lang] ?? HEADER_DICTIONARY[LANG.EN];

export const getFooterDictionary = (lang: LANG) =>
  FOOTER_DICTIONARY[lang] ?? FOOTER_DICTIONARY[LANG.EN];

export const getFeatureDictionary = (lang: LANG) =>
  FEATURE_DICTIONARY[lang] ?? FEATURE_DICTIONARY[LANG.EN];
