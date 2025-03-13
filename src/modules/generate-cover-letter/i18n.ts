import { LANG } from "@/enums/global";

export interface ResponseCardDictionary {
  load: string;
}

export interface CompanyDetailFormDictionary {
  company: string;
  role: string;
  detail: string;
}

const RESPONSE_CARD_DICTIONARY: Record<LANG, ResponseCardDictionary> = {
  [LANG.EN]: {
    load: "Analyzing your CV and job description...",
  },
  [LANG.ID]: {
    load: "Memproses CV dan deskripsi pekerjaan....",
  },
};

const COMPANY_DETAIL_FORM_DICTIONARY: Record<
  LANG,
  CompanyDetailFormDictionary
> = {
  [LANG.EN]: {
    company: "Company Name",
    role: "Role Name",
    detail: "Company Detail",
  },
  [LANG.ID]: {
    company: "Nama Perusahaan",
    role: "Nama Role",
    detail: "Detail Perusahaan",
  },
};

export const getResponseCardDictionary = (lang: LANG) =>
  RESPONSE_CARD_DICTIONARY[lang] ?? RESPONSE_CARD_DICTIONARY[LANG.EN];

export const getCompanyDetailFormDictionary = (lang: LANG) =>
  COMPANY_DETAIL_FORM_DICTIONARY[lang] ??
  COMPANY_DETAIL_FORM_DICTIONARY[LANG.EN];
