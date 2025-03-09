import { LANG } from "@/enums/global";
import type { ScoringFormDictionary } from "../shared/i18n";

export interface ScoreAlertDictionary {
  excellent: string;
  good: string;
  low: string;
}

export interface ScoreCardDictionary {
  title: string;
  desc: string;
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

const MATCH_SCORE_CARD_DICTIONARY: Record<LANG, ScoreCardDictionary> = {
  [LANG.EN]: {
    title: "CV Score Analysis",
    desc: "Match Score",
  },
  [LANG.ID]: {
    title: "Analisis Skor CV",
    desc: "Skor Kecocokan",
  },
};

const MATCH_KEYWORD_CARD_DICTIONARY: Record<LANG, ScoreCardDictionary> = {
  [LANG.EN]: {
    title: "Matching Keywords",
    desc: "No matching keywords",
  },
  [LANG.ID]: {
    title: "Kata Kunci yang Cocok",
    desc: "Tidak ada kata kunci yang cocok",
  },
};

const MISSING_KEYWORD_CARD_DICTIONARY: Record<LANG, ScoreCardDictionary> = {
  [LANG.EN]: {
    title: "Missing Keywords",
    desc: "No missing keywords",
  },
  [LANG.ID]: {
    title: "Kata Kunci yang Hilang",
    desc: "Tidak ada kata kunci yang hilang",
  },
};

const SCORE_ALERT_DICTIONARY: Record<LANG, ScoreAlertDictionary> = {
  [LANG.EN]: {
    excellent: "Excellent match for this position",
    good: "Good match, consider enhancing key areas",
    low: "Low match, significant improvements needed",
  },
  [LANG.ID]: {
    excellent: "Sangat cocok untuk posisi ini",
    good: "Cocok, perhatikan bidang yang penting",
    low: "Tidak cocok, perbaikan yang signifikan dibutuhkan",
  },
};

export const getScoringFormDictionary = (lang: LANG) =>
  SCORING_CV_FORM_DICTIONARY[lang] ?? SCORING_CV_FORM_DICTIONARY[LANG.EN];

export const getScoreAlertDictionary = (lang: LANG) =>
  SCORE_ALERT_DICTIONARY[lang] ?? SCORE_ALERT_DICTIONARY[LANG.EN];

export const getMatchScoreCardDictionary = (lang: LANG) =>
  MATCH_SCORE_CARD_DICTIONARY[lang] ?? MATCH_SCORE_CARD_DICTIONARY[LANG.EN];

export const getMatchKeywordCardDictionary = (lang: LANG) =>
  MATCH_KEYWORD_CARD_DICTIONARY[lang] ?? MATCH_KEYWORD_CARD_DICTIONARY[LANG.EN];

export const getMissingKeywordCardDictionary = (lang: LANG) =>
  MISSING_KEYWORD_CARD_DICTIONARY[lang] ??
  MISSING_KEYWORD_CARD_DICTIONARY[LANG.EN];

export const getJobDescDictionary = (lang: LANG) =>
  SCORING_JOB_DESC_DICTIONARY[lang] ?? SCORING_JOB_DESC_DICTIONARY[LANG.EN];
