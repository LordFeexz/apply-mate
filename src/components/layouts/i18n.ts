import { LANG } from "@/enums/global";

export interface HeaderDictionary {
  about: string;
  blog: string;
  organization: string;
}

export interface FooterDictionary {
  privacy: string;
  term: string;
}

const HEADER_DICTIONARY: Record<LANG, HeaderDictionary> = {
  [LANG.EN]: {
    about: "About",
    blog: "Blog",
    organization: "Our Organization",
  },
  [LANG.ID]: {
    about: "Tentang",
    blog: "Blog",
    organization: "Organisasi Kami",
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

export const getHeaderDictionary = (lang: LANG) =>
  HEADER_DICTIONARY[lang] ?? HEADER_DICTIONARY[LANG.EN];

export const getFooterDictionary = (lang: LANG) =>
  FOOTER_DICTIONARY[lang] ?? FOOTER_DICTIONARY[LANG.EN];
