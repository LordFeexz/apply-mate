import "server-only";
import midtrans, { type ItemDetail } from "midtrans-client";
import type { TransactionType } from "@/interfaces/payment";
import { v4 } from "uuid";
import { sha512 } from "js-sha512";
import {
  BANK_PAYMENT_METHOD,
  EWALLET_PAYMENT_METHOD,
  FEE_ITEM_ID,
  PRICE_PER_COIN,
  TOPUP_ITEM_ID,
} from "@/constants/payment";
import type {
  BankName,
  ChargeTopupViaBankProps,
  ChargeTopupViaEWalletProps,
} from "@/interfaces/payment";
import { MIDTRANS_ORDER_ID_START_CHAR } from "@/constants/payment";

const coreApi = new midtrans.CoreApi({
  isProduction: process.env.NODE_ENV === "production",
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

export function generatetopupViaEWalletItems(amount: number, provider: string) {
  const result: ItemDetail[] = [
    {
      id: TOPUP_ITEM_ID,
      price: amount * PRICE_PER_COIN,
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
      price: (data.percentageFee / 100) * amount * PRICE_PER_COIN,
      quantity: 1,
      name: "Percentage Fee",
    });

  return result;
}

export function generateTopupViaBankTransferItems(
  amount: number,
  name: BankName
): ItemDetail[] {
  const result: ItemDetail[] = [
    {
      id: TOPUP_ITEM_ID,
      price: amount * PRICE_PER_COIN,
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
      price: (data.percentageFee / 100) * amount * PRICE_PER_COIN,
      quantity: 1,
      name: "Percentage Fee",
    });

  return result;
}

export async function chargeTopupViaBankTransfer({
  email,
  name,
  amount,
  bank,
}: ChargeTopupViaBankProps) {
  const item_details = generateTopupViaBankTransferItems(amount, bank);
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

export async function chargeTopupViaGopay({
  amount,
  name,
  email,
}: Omit<ChargeTopupViaEWalletProps, "provider">) {
  const item_details = generatetopupViaEWalletItems(amount, "Gopay");
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
      callback_url: `${process.env.APP_DOMAIN}/transaction`,
    },
  });
}

export async function chargeTopupViaShopeePay({
  amount,
  name,
  email,
}: Omit<ChargeTopupViaEWalletProps, "provider">) {
  const item_details = generatetopupViaEWalletItems(amount, "ShopeePay");
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
      callback_url: `${process.env.APP_DOMAIN}/transaction`,
    },
  });
}

export async function chargeTopupViaEWallet({
  amount,
  provider,
  name,
  email,
}: ChargeTopupViaEWalletProps) {
  switch (provider) {
    case "Gopay":
      return chargeTopupViaGopay({ amount, name, email });
    case "ShopeePay":
      return chargeTopupViaShopeePay({ amount, name, email });
    default:
      break;
  }
}
