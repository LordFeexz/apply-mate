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
  },
  [LANG.ID]: {
    privacy: "Kebijakan Privasi",
    term: "Syarat dan Ketentuan",
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
