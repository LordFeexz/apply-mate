import "server-only";
import midtrans, { type ItemDetail } from "midtrans-client";
import type { TransactionType } from "@/interfaces/payment";
import { v4 } from "uuid";
import { sha512 } from "js-sha512";
import {
  BANK_PAYMENT_METHOD,
  EWALLET_PAYMENT_METHOD,
  FEE_ITEM_ID,
  TOPUP_ITEM_ID,
} from "@/constants/payment";
import type {
  BankName,
  ChargeTopupViaBankProps,
  ChargeTopupViaEWalletProps,
} from "@/interfaces/payment";
import { MIDTRANS_ORDER_ID_START_CHAR } from "@/constants/payment";
import { PRICING } from "@/enums/plan";
import { PAYG_PAYMENT } from "@/enums/global";
import { getPAYGPrice } from "./utils";

const coreApi = new midtrans.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export function generateTransactionId(type: TransactionType) {
  return `${MIDTRANS_ORDER_ID_START_CHAR}-${v4()}-${generateTransactionType(
    type
  )}`;
}

function generateTransactionType(type: TransactionType) {
  switch (type) {
    case "topup":
      return "tp";
    case "payment":
      return "py";
    case "refund":
      return "rf";
    case "settlement":
      return "st";
    default:
      return "unk";
  }
}

export function generateSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string
) {
  return sha512(
    orderId + statusCode + grossAmount + process.env.MIDTRANS_SERVER_KEY
  );
}

export function generateSubscriptionViaEWalletItems(provider: string) {
  const result: ItemDetail[] = [
    {
      id: TOPUP_ITEM_ID,
      price: PRICING.SUBSCRIPTION,
      quantity: 1,
      name: "Top up",
    },
  ];

  const data = EWALLET_PAYMENT_METHOD.find((el) => el.name === provider);
  if (!data) return result;

  if (data.fee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: data.fee,
      quantity: 1,
      name: "Fee",
    });

  if (data.percentageFee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: (data.percentageFee / 100) * PRICING.SUBSCRIPTION,
      quantity: 1,
      name: "Percentage Fee",
    });

  return result;
}

export function generatePAYGViaEWalletItems(
  provider: string,
  feature: PAYG_PAYMENT
) {
  const price = getPAYGPrice(feature);
  const result: ItemDetail[] = [
    {
      id: TOPUP_ITEM_ID,
      price,
      quantity: 1,
      name: "Top up",
    },
  ];

  const data = EWALLET_PAYMENT_METHOD.find((el) => el.name === provider);
  if (!data) return result;

  if (data.fee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: data.fee,
      quantity: 1,
      name: "Fee",
    });

  if (data.percentageFee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: (data.percentageFee / 100) * price,
      quantity: 1,
      name: "Percentage Fee",
    });

  return result;
}

export function generatePAYGViaBankTransferItems(
  name: BankName,
  feature: PAYG_PAYMENT
) {
  const price = getPAYGPrice(feature);
  const result: ItemDetail[] = [
    {
      id: TOPUP_ITEM_ID,
      price,
      quantity: 1,
      name: "Top up",
    },
  ];
  const data = BANK_PAYMENT_METHOD.find((el) => el.name === name);
  if (!data) return result;

  if (data.fee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: data.fee,
      quantity: 1,
      name: "Fee",
    });

  if (data.percentageFee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: (data.percentageFee / 100) * price,
      quantity: 1,
      name: "Percentage Fee",
    });

  return result;
}

export function generateSubscriptionViaBankTransferItems(
  name: BankName
): ItemDetail[] {
  const result: ItemDetail[] = [
    {
      id: TOPUP_ITEM_ID,
      price: PRICING.SUBSCRIPTION,
      quantity: 1,
      name: "Top up",
    },
  ];
  const data = BANK_PAYMENT_METHOD.find((el) => el.name === name);
  if (!data) return result;

  if (data.fee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: data.fee,
      quantity: 1,
      name: "Fee",
    });

  if (data.percentageFee > 0)
    result.push({
      id: FEE_ITEM_ID,
      price: (data.percentageFee / 100) * PRICING.SUBSCRIPTION,
      quantity: 1,
      name: "Percentage Fee",
    });

  return result;
}

export async function chargeTopupViaBankTransfer({
  email,
  name,
  bank,
}: ChargeTopupViaBankProps) {
  const item_details = generateSubscriptionViaBankTransferItems(bank);
  return coreApi.charge({
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: item_details
        .map(({ price }) => price)
        .reduce((a, b) => a + b),
      order_id: generateTransactionId("topup"),
    },
    customer_details: {
      email,
      first_name: name,
    },
    bank_transfer: { bank },
    item_details,
  });
}

export async function chargePAYGViaBankTransfer({
  email,
  name,
  bank,
  feature,
}: ChargeTopupViaBankProps & { feature: PAYG_PAYMENT }) {
  const item_details = generatePAYGViaBankTransferItems(bank, feature);
  return coreApi.charge({
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: item_details
        .map(({ price }) => price)
        .reduce((a, b) => a + b),
      order_id: generateTransactionId("payment"),
    },
    customer_details: {
      email,
      first_name: name,
    },
    bank_transfer: { bank },
    item_details,
  });
}

export async function chargeSubscriptionViaGopay({
  name,
  email,
}: Omit<ChargeTopupViaEWalletProps, "provider">) {
  const item_details = generateSubscriptionViaEWalletItems("Gopay");
  return coreApi.charge({
    payment_type: "gopay",
    transaction_details: {
      gross_amount: item_details
        .map(({ price }) => price)
        .reduce((a, b) => a + b),
      order_id: generateTransactionId("topup"),
    },
    customer_details: {
      email,
      first_name: name,
    },
    item_details,
    gopay: {
      enable_callback: true,
      callback_url: `${process.env.APP_DOMAIN}/en/account/transaction`,
    },
  });
}

export async function chargeSubscriptionViaShopeePay({
  name,
  email,
}: Omit<ChargeTopupViaEWalletProps, "provider">) {
  const item_details = generateSubscriptionViaEWalletItems("ShopeePay");
  return coreApi.charge({
    payment_type: "shopeepay",
    transaction_details: {
      gross_amount: item_details
        .map(({ price }) => price)
        .reduce((a, b) => a + b),
      order_id: generateTransactionId("topup"),
    },
    customer_details: {
      email,
      first_name: name,
    },
    item_details,
    shoppepay: {
      callback_url: `${process.env.APP_DOMAIN}/en/account/transaction`,
    },
  });
}

export async function chargePAYGViaGopay({
  name,
  email,
  feature,
}: Omit<ChargeTopupViaEWalletProps, "provider"> & { feature: PAYG_PAYMENT }) {
  const item_details = generatePAYGViaEWalletItems("Gopay", feature);
  return coreApi.charge({
    payment_type: "gopay",
    transaction_details: {
      gross_amount: item_details
        .map(({ price }) => price)
        .reduce((a, b) => a + b),
      order_id: generateTransactionId("payment"),
    },
    customer_details: {
      email,
      first_name: name,
    },
    item_details,
    gopay: {
      enable_callback: true,
      callback_url: `${process.env.APP_DOMAIN}/en/account/transaction`,
    },
  });
}

export async function chargePAYGViaShopeePay({
  name,
  email,
  feature,
}: Omit<ChargeTopupViaEWalletProps, "provider"> & { feature: PAYG_PAYMENT }) {
  const item_details = generatePAYGViaEWalletItems("ShopeePay", feature);
  return coreApi.charge({
    payment_type: "shopeepay",
    transaction_details: {
      gross_amount: item_details
        .map(({ price }) => price)
        .reduce((a, b) => a + b),
      order_id: generateTransactionId("payment"),
    },
    customer_details: {
      email,
      first_name: name,
    },
    item_details,
    shoppepay: {
      callback_url: `${process.env.APP_DOMAIN}/en/account/transaction`,
    },
  });
}

export async function chargeSubscriptionViaEWallet({
  provider,
  name,
  email,
}: ChargeTopupViaEWalletProps) {
  switch (provider) {
    case "Gopay":
      return chargeSubscriptionViaGopay({ name, email });
    case "ShopeePay":
      return chargeSubscriptionViaShopeePay({ name, email });
    default:
      break;
  }
}

export async function chargePAYGViaEWallet({
  provider,
  name,
  email,
  feature,
}: ChargeTopupViaEWalletProps & { feature: PAYG_PAYMENT }) {
  switch (provider) {
    case "Gopay":
      return chargePAYGViaGopay({ name, email, feature });
    case "ShopeePay":
      return chargePAYGViaShopeePay({ name, email, feature });
    default:
      break;
  }
}
