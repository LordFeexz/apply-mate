import { LANG } from "@/enums/global";

export interface CvFormDictionary {
  placeholder: string;
  fileFormat: string;
}

export interface VaViewerDictionary {
  accountNo: string;
}

export interface VaFormDictionary {
  title: string;
}

export interface VaInstructionDictionary {
  instruction: string;
  instructions: string[];
  note: string;
}

export interface EWalletFormDictionary {
  title: string;
}

export interface EWalletInstructionDictionary {
  note: string;
}

export interface ScoringFormDictionary {
  cvLabel: string;
  cvDesc: string;
}

export interface ContainerInputDictionary {
  title: string;
  desc: string;
}

export interface SubscribeBtnDictionary {
  btnText: string;
  dialogDesc: string;
  quickPayment: string;
}

export interface CurrentPlanDictionary {
  title: string;
  subsBadge: string;
}

const CV_FORM_DICTIONARY: Record<LANG, CvFormDictionary> = {
  [LANG.EN]: {
    placeholder: "Paste your current CV here...",
    fileFormat: "Supported formats: .pdf, .doc, .docx",
  },
  [LANG.ID]: {
    placeholder: "Copas CV mu kesini...",
    fileFormat: "Format file yang didukung: .pdf, .doc, .docx",
  },
};

const CURRENT_PLAN_DICTIONARY: Record<LANG, CurrentPlanDictionary> = {
  [LANG.EN]: {
    title: "Current Plan",
    subsBadge: "Subscribed",
  },
  [LANG.ID]: {
    title: "Paket Saat Ini",
    subsBadge: "Berlangganan",
  },
};

const SIGNIN_SECTION_DICTIONARY: Record<LANG, EWalletFormDictionary> = {
  [LANG.EN]: { title: "Sign in to see your plan" },
  [LANG.ID]: { title: "Masuk untuk melihat paket Anda" },
};
const SCORING_JOB_DESC_DICTIONARY: Record<LANG, ContainerInputDictionary> = {
  [LANG.EN]: {
    title: "Job Description",
    desc: "Paste job description here",
  },
  [LANG.ID]: {
    title: "Deskripsi Pekerjaan",
    desc: "Copas deskripsi pekerjaan disini",
  },
};

const MATCH_KEYWORD_CARD_DICTIONARY: Record<LANG, ContainerInputDictionary> = {
  [LANG.EN]: {
    title: "Matching Keywords",
    desc: "No matching keywords",
  },
  [LANG.ID]: {
    title: "Kata Kunci yang Cocok",
    desc: "Tidak ada kata kunci yang cocok",
  },
};

const VA_FORM_DICTIONARY: Record<LANG, VaFormDictionary> = {
  [LANG.EN]: {
    title: "Virtual Account",
  },
  [LANG.ID]: {
    title: "Virtual Account",
  },
};

const VA_INSTRUCTION_DICTIONARY: Record<LANG, VaInstructionDictionary> = {
  [LANG.EN]: {
    instruction: "Instruction",
    instructions: [
      "Log in to your banking app",
      `Select "Transfer" or "Pay"`,
      "Enter the account number above",
      "Confirm the payment amount",
      "Complete the transaction",
    ],
    note: "Note: Virtual Account transactions incur an additional fee of",
  },
  [LANG.ID]: {
    instruction: "Instruksi",
    instructions: [
      "Masuk ke aplikasi bank Anda",
      `Pilih "Transfer" atau "Pay"`,
      "Masukkan nomor rekening di atas",
      "Konfirmasi jumlah pembayaran",
      "Selesaikan transaksi",
    ],
    note: "Catatan: Transaksi dengan Virtual Account akan dikenakan fee sebesar",
  },
};

const EWALLET_FORM_DICTIONARY: Record<LANG, EWalletFormDictionary> = {
  [LANG.EN]: {
    title: "Scan QR Code",
  },
  [LANG.ID]: {
    title: "Scan QR Code",
  },
};

const EWALLET_INSTRUCTION_DICTIONARY: Record<
  LANG,
  EWalletInstructionDictionary
> = {
  [LANG.EN]: {
    note: "Note: QR code transactions incur an additional fee of 0.7% of the transaction value",
  },
  [LANG.ID]: {
    note: "Catatan: Transaksi dengan E-Wallet akan dikenakan fee sebesar 0.7% dari total transaksi",
  },
};

const SUBSCRIBE_BTN_DICTIONARY: Record<LANG, SubscribeBtnDictionary> = {
  [LANG.EN]: {
    btnText: "Subscribe Now",
    dialogDesc: "Subscribe to get unlimited access",
    quickPayment: "Quick Payment",
  },
  [LANG.ID]: {
    btnText: "Berlangganan Sekarang",
    dialogDesc: "Berlangganan untuk mendapatkan akses tak terbatas",
    quickPayment: "Pembayaran Cepat",
  },
};

const VA_VIEWER_DICTIONARY: Record<LANG, VaViewerDictionary> = {
  [LANG.EN]: {
    accountNo: "Virtual Account Number:",
  },
  [LANG.ID]: {
    accountNo: "Nomor Virtual Account:",
  },
};

const POINT_SECTION_DICTIONARY: Record<LANG, ContainerInputDictionary> = {
  [LANG.EN]: {
    title: "Credit Options",
    desc: "Choose the plan that works best for you",
  },
  [LANG.ID]: {
    title: "Pilihan Kredit",
    desc: "Pilih paket yang cocok untuk Anda",
  },
};

export const getCvDictionary = (lang: LANG) =>
  CV_FORM_DICTIONARY[lang] ?? CV_FORM_DICTIONARY[LANG.EN];

export const getJobDescDictionary = (lang: LANG) =>
  SCORING_JOB_DESC_DICTIONARY[lang] ?? SCORING_JOB_DESC_DICTIONARY[LANG.EN];

export const getMatchKeywordCardDictionary = (lang: LANG) =>
  MATCH_KEYWORD_CARD_DICTIONARY[lang] ?? MATCH_KEYWORD_CARD_DICTIONARY[LANG.EN];

export const getVaDictionary = (lang: LANG) =>
  VA_FORM_DICTIONARY[lang] ?? VA_FORM_DICTIONARY[LANG.EN];

export const getEwalletDictionary = (lang: LANG) =>
  EWALLET_FORM_DICTIONARY[lang] ?? EWALLET_FORM_DICTIONARY[LANG.EN];

export const getSubscribeBtnDictionary = (lang: LANG) =>
  SUBSCRIBE_BTN_DICTIONARY[lang] ?? SUBSCRIBE_BTN_DICTIONARY[LANG.EN];

export const getCurrentPlanDictionary = (lang: LANG) =>
  CURRENT_PLAN_DICTIONARY[lang] ?? CURRENT_PLAN_DICTIONARY[LANG.EN];

export const getVaViewerDictionary = (lang: LANG) =>
  VA_VIEWER_DICTIONARY[lang] ?? VA_VIEWER_DICTIONARY[LANG.EN];

export const getVaInstructionDictionary = (lang: LANG) =>
  VA_INSTRUCTION_DICTIONARY[lang] ?? VA_INSTRUCTION_DICTIONARY[LANG.EN];

export const getEwalletInstructionDictionary = (lang: LANG) =>
  EWALLET_INSTRUCTION_DICTIONARY[lang] ??
  EWALLET_INSTRUCTION_DICTIONARY[LANG.EN];

export const getPointSectionDictionary = (lang: LANG) =>
  POINT_SECTION_DICTIONARY[lang] ?? POINT_SECTION_DICTIONARY[LANG.EN];

export const getSigninSectionDictionary = (lang: LANG) =>
  SIGNIN_SECTION_DICTIONARY[lang] ?? SIGNIN_SECTION_DICTIONARY[LANG.EN];
