import { LANG } from "@/enums/global";

export interface CvFormDictionary {
  placeholder: string;
  fileFormat: string;
}

export interface VaFormDictionary {
  title: string;
  accountNo: string;
  instruction: string;
  instructions: string[];
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
    accountNo: "Virtual Account Number:",
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
    title: "Virtual Account",
    accountNo: "Nomor Virtual Account:",
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

export const getCvDictionary = (lang: LANG) =>
  CV_FORM_DICTIONARY[lang] ?? CV_FORM_DICTIONARY[LANG.EN];

export const getJobDescDictionary = (lang: LANG) =>
  SCORING_JOB_DESC_DICTIONARY[lang] ?? SCORING_JOB_DESC_DICTIONARY[LANG.EN];

export const getMatchKeywordCardDictionary = (lang: LANG) =>
  MATCH_KEYWORD_CARD_DICTIONARY[lang] ?? MATCH_KEYWORD_CARD_DICTIONARY[LANG.EN];

export const getVaDictionary = (lang: LANG) =>
  VA_FORM_DICTIONARY[lang] ?? VA_FORM_DICTIONARY[LANG.EN];
