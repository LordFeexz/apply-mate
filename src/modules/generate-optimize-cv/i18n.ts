import { LANG } from "@/enums/global";
import type { ScoringFormDictionary } from "../shared/i18n";

export interface ScoreCardDictionary {
  title: string;
  desc: string;
}

export interface AddLinkDialogDictionary extends ScoreCardDictionary {
  insert: string;
}

export interface HyperlinkCardDictionary extends ScoreCardDictionary {
  subTitle: string;
  haveLink: string;
  note: string;
}

export interface ImprovedCardDictionary
  extends Omit<ScoreCardDictionary, "desc"> {
  subTitle: string;
}

const SCORING_CV_FORM_DICTIONARY: Record<LANG, ScoringFormDictionary> = {
  [LANG.EN]: {
    cvLabel: "Your Current CV",
    cvDesc: "Paste your current CV or upload a file",
  },
  [LANG.ID]: {
    cvLabel: "CV Terbaru mu",
    cvDesc: "Copas CV mu atau upload kesini",
  },
};

const SCORING_JOB_DESC_DICTIONARY: Record<LANG, ScoreCardDictionary> = {
  [LANG.EN]: {
    title: "Job Description",
    desc: "Paste job description here",
  },
  [LANG.ID]: {
    title: "Deskripsi Pekerjaan",
    desc: "Copas deskripsi pekerjaan disini",
  },
};

const ADD_LINK_DIALOG_DICTIONARY: Record<LANG, AddLinkDialogDictionary> = {
  [LANG.EN]: {
    title: "Insert Hyperlink",
    desc: "Add a link to your CV. This will be displayed as clickable text.",
    insert: "Insert",
  },
  [LANG.ID]: {
    title: "Tambahkan Link",
    desc: "Tambahkan link ke CV mu. Ini akan ditampilkan sebagai teks yang bisa diklik.",
    insert: "Tambahkan",
  },
};

const HYPERLINK_CARD_DICTIONARY: Record<LANG, HyperlinkCardDictionary> = {
  [LANG.EN]: {
    title: "Hyperlinks in Your CV",
    desc: "Adding hyperlinks to your CV makes it interactive and provides easy access to your online presence.",
    subTitle: "Recommended links to include:",
    haveLink: "You have add all the links needed",
    note: "Note: Links are saved in Markdown format [text](url) but will appear as clickable text in the final CV.",
  },
  [LANG.ID]: {
    title: "Hyperlinks di CV mu",
    desc: "Tambahkan link ke CV mu. Ini akan ditampilkan sebagai teks yang bisa diklik.",
    subTitle: "Link yang direkomendasikan untuk diisi:",
    haveLink: "Anda telah menambahkan semua link yang diperlukan",
    note: "Catatan: Link disimpan dalam format Markdown [text](url) tetapi akan muncul sebagai teks yang bisa diklik di CV akhir.",
  },
};

const IMPROVED_CARD_DICTIONARY: Record<LANG, ImprovedCardDictionary> = {
  [LANG.EN]: {
    title: "Improvement",
    subTitle: "What's Improved:",
  },
  [LANG.ID]: {
    title: "Perbaikan",
    subTitle: "Apa yang Diperbaiki:",
  },
};

export const getJobDescDictionary = (lang: LANG) =>
  SCORING_JOB_DESC_DICTIONARY[lang] ?? SCORING_JOB_DESC_DICTIONARY[LANG.EN];

export const getScoringFormDictionary = (lang: LANG) =>
  SCORING_CV_FORM_DICTIONARY[lang] ?? SCORING_CV_FORM_DICTIONARY[LANG.EN];

export const getAddLinkDialogDictionary = (lang: LANG) =>
  ADD_LINK_DIALOG_DICTIONARY[lang] ?? ADD_LINK_DIALOG_DICTIONARY[LANG.EN];

export const getHyperlinkCardDictionary = (lang: LANG) =>
  HYPERLINK_CARD_DICTIONARY[lang] ?? HYPERLINK_CARD_DICTIONARY[LANG.EN];

export const getImprovedCardDictionary = (lang: LANG) =>
  IMPROVED_CARD_DICTIONARY[lang] ?? IMPROVED_CARD_DICTIONARY[LANG.EN];
