"use server";

import { LANGS } from "@/enums/global";
import { verifyCsrfToken } from "@/libs/csrf";
import { Transaction } from "@/models";
import midtransClient from "@/third-party/midtrans";
import { revalidatePath } from "next/cache";

export async function cancelTransaction(id: string, csrf: string) {
  if (!csrf || !verifyCsrfToken(csrf))
    return {
      code: 403,
      message: "missing or invalid csrf token",
      data: null,
      errors: null,
    };

  const transaction = await Transaction.findByPk(id, { raw: true });
  if (!transaction)
    return {
      code: 404,
      messsage: "transaction not found",
      data: null,
      errors: null,
    };

  if (transaction.status !== "pending")
    return {
      code: 400,
      message: "cannot cancel transaction",
      data: null,
      errors: null,
    };

  const { status, data, ...rest } = await midtransClient.cancelOrder(
    transaction.id
  );
  if (status <= 204)
    await Transaction.update({ status: "cancel" }, { where: { id } });

  LANGS.forEach((lang) => {
    revalidatePath(`/${lang}/account/transaction/${id}`);
    revalidatePath(`/${lang}/account/transaction`);
  });

  return { code: 200, message: "cancelled", data: null, errors: null };
}
