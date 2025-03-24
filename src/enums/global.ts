export enum LANG {
  EN = "en",
  ID = "id",
}

export const LANGS = [LANG.EN, LANG.ID];

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export const THEMES = Object.values(THEME);

export enum FEATURE {
  SCORING_CV = "scoring-cv",
  GENERATE_OPTIMIZE_CV = "generate-optimize-cv",
  GENERATE_COVER_LETTER = "generate-cover-letter",
}

export const FEATURES = Object.values(FEATURE);

export enum LANG_GENERATE {
  EN = "English",
  ID = "Bahasa Indonesia",
}

export const LANG_GENERATES = Object.values(LANG_GENERATE);

export enum PAYG_PAYMENT {
  CV_SCORING = "scoring-cv",
  CV_GENERATE = "generate-optimize-cv",
  COVER_LETTER_GENERATE = "generate-cover-letter",
}

export enum ACCOUNT_TAB {
  TRANSACTION = "transaction",
  SUBSCRIPTION = "subscription",
}
