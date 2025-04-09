import { LANG } from "@/enums/global";

export interface OurOrganizationPageDictionary {
  title: string;
  subtitle: string;
  desc: string;
}

const OUR_ORGANIZATION_PAGE_DICTIONARY: Record<
  LANG,
  OurOrganizationPageDictionary
> = {
  [LANG.EN]: {
    title: "Our Organization",
    subtitle: "About Apply Mate",
    desc: "Apply Mate is a cutting-edge AI-powered platform designed to help job seekers create professional, tailored CVs and cover letters. Our mission is to simplify the job application process and increase the chances of our users landing their dream jobs.",
  },
  [LANG.ID]: {
    title: "Organisasi Kami",
    subtitle: "Tentang Apply Mate",
    desc: "Apply Mate adalah platform AI mutakhir yang dirancang untuk membantu pencari kerja membuat CV dan surat pengantar yang profesional dan disesuaikan. Misi kami adalah menyederhanakan proses lamaran kerja dan meningkatkan peluang pengguna kami mendapatkan pekerjaan impian mereka.",
  },
};

export const getOurOrganizationPageDictionary = (lang: LANG) =>
  OUR_ORGANIZATION_PAGE_DICTIONARY[lang] ??
  OUR_ORGANIZATION_PAGE_DICTIONARY[LANG.EN];
