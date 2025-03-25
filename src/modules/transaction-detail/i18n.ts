import { LANG } from "@/enums/global";

export interface TransactionDetailDictionary {
  title: string;
  transactionId: string;
  date: string;
  status: string;
  amount: string;
  provider: string;
}

export interface TransactionDetailBreadcrumbDictionary {
  home: string;
  transaction: string;
  detail: string;
}

export interface PayBtnDictionary {
  btnText: string;
  title: string;
}

const TRANSACTION_DETAIL_BREADCRUMB: Record<
  LANG,
  TransactionDetailBreadcrumbDictionary
> = {
  [LANG.EN]: {
    home: "Home",
    transaction: "Transaction",
    detail: "Detail",
  },
  [LANG.ID]: {
    home: "Beranda",
    transaction: "Transaksi",
    detail: "Detail",
  },
};

const PAY_BTN_DICTIONARY: Record<LANG, PayBtnDictionary> = {
  [LANG.EN]: {
    btnText: "Pay",
    title: "Finish your payment",
  },
  [LANG.ID]: {
    btnText: "Bayar",
    title: "Selesaikan pembayaranmu",
  },
};

const TRANSACTION_DETAIL_DICTIONARY: Record<LANG, TransactionDetailDictionary> =
  {
    [LANG.EN]: {
      title: "Transaction Detail",
      transactionId: "Transaction ID",
      date: "Date",
      status: "Status",
      amount: "Amount",
      provider: "Provider",
    },
    [LANG.ID]: {
      title: "Detail Transaksi",
      transactionId: "ID Transaksi",
      date: "Tanggal",
      status: "Status",
      amount: "Jumlah",
      provider: "Penyedia",
    },
  };

export const getTransactionDetailBreadcrumbDictionary = (lang: LANG) =>
  TRANSACTION_DETAIL_BREADCRUMB[lang] ?? TRANSACTION_DETAIL_BREADCRUMB[LANG.EN];

export const getTransactionDetailDictionary = (lang: LANG) =>
  TRANSACTION_DETAIL_DICTIONARY[lang] ?? TRANSACTION_DETAIL_DICTIONARY[LANG.EN];

export const getPayBtnDictionary = (lang: LANG) =>
  PAY_BTN_DICTIONARY[lang] ?? PAY_BTN_DICTIONARY[LANG.EN];
