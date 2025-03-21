import type {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
  Currency,
} from "@/interfaces/payment";

export const BANK_PAYMENT_METHOD: PaymentMethod[] = [
  {
    name: "BNI",
    fee: 4000,
    type: "Bank Transfer",
    percentageFee: 0,
  },
  {
    name: "BRI",
    fee: 4000,
    type: "Bank Transfer",
    percentageFee: 0,
  },
  {
    name: "BCA",
    fee: 4000,
    type: "Bank Transfer",
    percentageFee: 0,
  },
  {
    name: "MANDIRI",
    fee: 4000,
    type: "Bank Transfer",
    percentageFee: 0,
  },
  {
    name: "PERMATA",
    fee: 4000,
    type: "Bank Transfer",
    percentageFee: 0,
  },
];

export const CREDIT_CARD_PAYMENT_METHOD: PaymentMethod[] = [
  {
    name: "Credit Card",
    fee: 2000,
    type: "Credit Card",
    percentageFee: 2.9,
  },
];

export const EWALLET_PAYMENT_METHOD: PaymentMethod[] = [
  {
    name: "Gopay",
    fee: 0,
    type: "EWallet",
    percentageFee: 2,
  },
];

export const PAYMENT_METHODS = [
  {
    type: "Bank Transfer",
    values: BANK_PAYMENT_METHOD,
  },
  //removed for now
  // {
  //   type: "Credit Card",
  //   values: CREDIT_CARD_PAYMENT_METHOD,
  // },
  {
    type: "EWallet",
    values: EWALLET_PAYMENT_METHOD,
  },
];

export const PRICE_PER_COIN = 1000;

export const TOPUP_ITEM_ID = "TU";

export const FEE_ITEM_ID = "FE";

export const PERCENTAGE_FEE_ITEM_ID = "PF";

export const MIDTRANS_ORDER_ID_START_CHAR = "AM";

export const TRANSACTION_STATUS: TransactionStatus[] = [
  "pending",
  "completed",
  "failed",
  "cancel",
  "refund",
  "settlement",
  "deny",
  "expire",
];

export const TRANSACTION_TYPE: TransactionType[] = [
  "topup",
  "payment",
  "refund",
];

export const TRANSACTION_CURRENCY: Currency[] = ["IDR", "USD"];
