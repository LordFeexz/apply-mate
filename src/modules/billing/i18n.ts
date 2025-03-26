import { LANG } from "@/enums/global";

export interface BillingPageDictionary {
  title: string;
}

const BILLING_PAGE_DICTIONARY: Record<LANG, BillingPageDictionary> = {
  [LANG.EN]: { title: "Subscription & Billing" },
  [LANG.ID]: { title: "Langganan & Pembayaran" },
};

export const getBillingPageDictionary = (lang: LANG) =>
  BILLING_PAGE_DICTIONARY[lang] ?? BILLING_PAGE_DICTIONARY[LANG.EN];
