"use server";

import {
  MIDTRANS_ORDER_ID_START_CHAR,
  TRANSACTION_STATUS,
} from "@/constants/payment";
import { ITEM } from "@/enums/plan";
import type { TransactionStatus } from "@/interfaces/payment";
import { DB, GenerateProfile, Transaction, User } from "@/models";
import { NextResponse, type NextRequest } from "next/server";
import { addMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  SSE_PAYG_PAYMENT_TYPE,
  SSE_SUBSCRIBE_PAYMENT_TYPE,
} from "../shared/constant";
import { generateSignature } from "@/libs/midtrans";
import type { UserAttributes } from "@/models/user";
import type { GenerateProfileAttributes } from "@/models/generate_profile";

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      {
        code: 400,
        message: "Content Type must be application/json",
        data: null,
        errors: null,
      },
      { status: 400 }
    );

  const {
    signature_key,
    order_id,
    transaction_status,
    status_code,
    gross_amount,
    ...t
  } = (await req.json()) as Record<string, string>;

  if (!signature_key || typeof signature_key !== "string")
    return NextResponse.json(
      {
        code: 400,
        message: "Bad Request",
        errors: { signature_key: ["signature_key is required"] },
        data: null,
      },
      { status: 400 }
    );

  if (!order_id || typeof order_id !== "string")
    return NextResponse.json(
      {
        code: 400,
        message: "Bad Request",
        errors: {
          order_id: ["order_id is required"],
        },
        data: null,
      },
      { status: 400 }
    );

  if (!order_id.startsWith(MIDTRANS_ORDER_ID_START_CHAR))
    return NextResponse.json(
      { code: 400, message: "invalid order id", error: null, data: null },
      { status: 400 }
    );

  const transaction = await DB.transaction();
  try {
    const data = await Transaction.findOne({
      where: { order_id },
      lock: transaction.LOCK.UPDATE,
      transaction,
      raw: true,
      nest: true,
    });
    if (!data)
      return NextResponse.json(
        {
          code: 404,
          message: "transaction not found",
          error: null,
          data: null,
        },
        { status: 404 }
      );

    if (
      generateSignature(data.order_id, status_code, gross_amount) !==
      signature_key
    )
      return NextResponse.json(
        {
          code: 401,
          message: "invalid signature",
          error: null,
          data: null,
        },
        { status: 401 }
      );

    const user = (await User.findOne({
      where: { id: data.user_id },
      transaction,
      lock: transaction.LOCK.UPDATE,
      raw: true,
      nest: true,
      include: [
        {
          model: GenerateProfile,
          as: "generate_profile",
          required: true,
        },
      ],
    })) as
      | (UserAttributes & { generate_profile: GenerateProfileAttributes })
      | null;

    if (!user)
      return NextResponse.json(
        { code: 404, message: "user not found", error: null, data: null },
        { status: 404 }
      );

    const splitted = order_id.split("-");
    const orderType = splitted[splitted.length - 1];

    const tasks: any[] = [
      Transaction.update(
        {
          status: TRANSACTION_STATUS.includes(transaction_status as any)
            ? (transaction_status as TransactionStatus)
            : "failed",
        },
        { where: { id: data.id }, transaction }
      ),
    ];

    switch (orderType) {
      case "tp":
        {
          if (transaction_status === "settlement") {
            if (data.detail?.item === ITEM.SUBSCRIPTION) {
              const now = new Date();
              const premium_start_date = toZonedTime(now, "Asia/Jakarta");
              const premium_end_date = toZonedTime(
                addMonths(premium_start_date, 1),
                "Asia/Jakarta"
              );

              tasks.push(
                GenerateProfile.update(
                  {
                    premium_start_date,
                    premium_end_date,
                  },
                  { where: { user_id: user.id }, transaction }
                )
              );

              if (globalThis?.paymentEvents?.[user.id])
                globalThis.paymentEvents[user.id].write(
                  JSON.stringify({
                    premium_start_date,
                    premium_end_date,
                    type: SSE_SUBSCRIBE_PAYMENT_TYPE,
                  })
                );
            }
          }
        }
        break;
      case "py":
        {
          if (transaction_status === "settlement") {
            if (data.detail?.item === ITEM.PAYG) {
              const newData = [
                ...user?.generate_profile?.pay_as_you_go_payments,
                data?.detail?.feature,
              ];
              tasks.push(
                GenerateProfile.update(
                  {
                    pay_as_you_go_payments: newData,
                  },
                  { transaction, where: { user_id: user.id } }
                )
              );

              if (globalThis?.paymentEvents?.[user.id])
                globalThis.paymentEvents[user.id].write(
                  JSON.stringify({
                    pay_as_you_go_payments: newData,
                    type: SSE_PAYG_PAYMENT_TYPE,
                  })
                );
            }
          }
        }
        break;
      default:
        console.log(orderType);
        await transaction.rollback();
        return NextResponse.json(
          { code: 400, message: "invalid order type", error: null, data: null },
          { status: 400 }
        );
    }

    await Promise.all(tasks);
    await transaction.commit();
    return NextResponse.json({
      code: 200,
      message: "OK",
      error: null,
      data: null,
    });
  } catch (err) {
    console.log(err, "di catch");
    await transaction.rollback();
    return NextResponse.json(
      { code: 500, message: "Unexpected Error", error: err, data: null },
      { status: 500 }
    );
  }
}
