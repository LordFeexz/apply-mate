import { LANG } from "@/enums/global";

export interface TransactionDictionary {
  title: string;
  notFoundStage: string;
}

const TRANSACTION_DICTIONARY: Record<LANG, TransactionDictionary> = {
  [LANG.EN]: { title: "Transaction", notFoundStage: "Transaction not found" },
  [LANG.ID]: { title: "Transaksi", notFoundStage: "Transaksi tidak ditemukan" },
};

export const getTransactionDictionary = (lang: LANG) =>
  TRANSACTION_DICTIONARY[lang] ?? TRANSACTION_DICTIONARY[LANG.EN];
