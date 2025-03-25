"use server";

import { LANG } from "@/enums/global";
import { getServerSideSession } from "@/libs/session";
import { GenerateProfile, User } from "@/models";
import { redirect } from "next/navigation";
import {
  SUBSCRIBE_BY_BANK_SCHEMA,
  SUBSCRIBE_BY_EWALLET_SCHEMA,
  type ISubscribeByBankSchema,
  type ISubscribeByEwalletSchema,
  type ISubscribeState,
} from "./schema";
import { Transaction } from "@/models";
import { v4 } from "uuid";
import { ITEM, PRICING } from "@/enums/plan";
import { BANK_PAYMENT_METHOD } from "@/constants/payment";
import {
  chargeSubscriptionViaEWallet,
  chargeTopupViaBankTransfer,
  generateSignature,
} from "@/libs/midtrans";
import { getCsrfToken } from "@/libs/csrf";

export async function getCurrentProfile() {
  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/en/sign-in`);

  const data = await GenerateProfile.findOne({
    where: { user_id: session.user.id },
    raw: true,
    benchmark: true,
  });
  if (!data) redirect(`/en/sign-in`);

  return data;
}

export async function subscribedAction(
  prevState: ISubscribeState,
  formData: FormData
) {
  const lang = formData.get("lang") ?? LANG.EN;
  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const user = await User.findByPk(session.user.id);
  if (!user) redirect(`/${lang}/sign-in`);

  const type = formData.get("type") ?? "e-wallet";
  const { data, error, success } = await (type === "va"
    ? SUBSCRIBE_BY_BANK_SCHEMA
    : SUBSCRIBE_BY_EWALLET_SCHEMA
  ).safeParseAsync({
    type,
    feature: formData.get("feature"),
    ...{ [type === "va" ? "bank" : "ewallet"]: formData.get("provider") },
  });
  if (!success)
    return {
      ...prevState,
      errors: error.formErrors.fieldErrors,
      error: "Bad Request",
    };

  const existing = await Transaction.findOne({
    where: { user_id: user.id, status: "pending" },
    raw: true,
    benchmark: true,
  });
  if (existing) redirect(`/${lang}/account/transaction/${existing.id}`);

  const charge = await (data.type === "e-wallet"
    ? chargeSubscriptionViaEWallet({
        provider: "Gopay",
        name: user.name,
        email: user.email,
      })
    : chargeTopupViaBankTransfer({
        email: user.email,
        name: user.name,
        bank: (data as ISubscribeByBankSchema)?.bank,
      }));

  if (!charge || +charge.status_code > 204)
    return {
      ...prevState,
      ...data,
      error: charge?.status_message,
    };

  await Transaction.create({
    id: v4(),
    user_id: user.id,
    amount: PRICING.SUBSCRIPTION,
    transaction_type: "topup",
    currency: "IDR",
    status: "pending",
    description: "Purchasing Subscription",
    detail: {
      type: data.type,
      feature: data.feature,
      provider:
        data.type === "e-wallet"
          ? (data as ISubscribeByEwalletSchema)?.ewallet
          : (data as ISubscribeByBankSchema)?.bank,
      va_number:
        (data as ISubscribeByBankSchema)?.bank === "PERMATA"
          ? charge.permata_va_number ?? []
          : (charge?.va_numbers ?? []).map((el) => el.va_number),
      actions: charge?.actions ?? [],
      item: ITEM.SUBSCRIPTION,
      order_id: charge.order_id,
    },
    signature: generateSignature(
      charge.order_id,
      charge.status_code,
      charge.gross_amount
    ),
    fee:
      data.type === "e-wallet"
        ? PRICING.SUBSCRIPTION * (0.7 / 100)
        : BANK_PAYMENT_METHOD.find(
            (el) => el.name === (data as ISubscribeByBankSchema)?.bank
          )?.fee || 0,
    tax: 0,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return {
    ...prevState,
    ...data,
    ...(data.type === "e-wallet"
      ? {
          qr: charge.actions?.find((el) => el.name === "generate-qr-code")?.url,
          va: "",
        }
      : {
          va:
            (data as ISubscribeByBankSchema)?.bank === "PERMATA"
              ? charge.permata_va_number
              : charge?.va_numbers?.[0]?.va_number,
          qr: "",
        }),
  };
}

export async function getCSRF() {
  return getCsrfToken();
}
