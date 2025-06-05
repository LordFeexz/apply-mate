import { LANG } from "@/enums/global";

export interface UnderDevelopmentPageDictionary {
  title: string;
  subTitle: string;
  desc: string;
}

export const UNDER_DEVELOPMENT_DICTIONARY: Record<
  LANG,
  UnderDevelopmentPageDictionary
> = {
  [LANG.EN]: {
    title: "Under Development",
    subTitle: "We're working hard to bring you something amazing!",
    desc: "This feature is currently being developed and will be available soon.",
  },
  [LANG.ID]: {
    title: "Dalam Pengembangan",
    subTitle:
      "Kami sedang bekerja keras untuk menghadirkan sesuatu yang luar biasa!",
    desc: "Fitur ini sedang dalam pengembangan dan akan tersedia segera.",
  },
};

export const getUnderDevelopmentDictionary = (lang: LANG) =>
  UNDER_DEVELOPMENT_DICTIONARY[lang] ?? UNDER_DEVELOPMENT_DICTIONARY[LANG.EN];
