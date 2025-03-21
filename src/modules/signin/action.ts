"use server";

import { verifyIdToken } from "@/libs/goggle-oauth";
import { DB, GenerateProfile, User } from "@/models";
import type { TokenPayload } from "google-auth-library";
import { z } from "zod";
import { v4 } from "uuid";
import { createToken } from "@/libs/jwt";

export async function googleLoginAction(rawToken: string) {
  const { success, error, data } = await z
    .string({
      required_error: "Token is required",
      invalid_type_error: "Token must be a string",
    })
    .safeParseAsync(rawToken);

  if (!success)
    return {
      message: error.format()._errors,
      errors: {
        token: error.format()._errors,
      },
      data: null,
      code: 400,
    };

  const ticket = await verifyIdToken(data);
  if (!ticket)
    return {
      message: "failed to get ticket",
      errors: null,
      data: null,
      code: 400,
    };

  const { email, email_verified, given_name } =
    ticket.getPayload() as TokenPayload;

  const transaction = await DB.transaction();
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      hooks: false,
      defaults: {
        id: v4(),
        email,
        name: given_name,
        verified: email_verified,
        password: "GOOGLE_OAUTH",
        created_at: new Date(),
        updated_at: new Date(),
      },
      transaction,
    });

    if (created)
      await GenerateProfile.create(
        {
          points: 0,
          user_id: user.id,
          created_at: new Date(),
          updated_at: new Date(),
          pay_as_you_go_payments: [],
          premium_end_date: null,
          premium_start_date: null,
        },
        { transaction }
      );

    await transaction.commit();
    return {
      data: createToken(user.id),
      message: "ok",
      code: 200,
      erros: null,
    };
  } catch (err) {
    await transaction.rollback();
    return { data: null, message: "unexpected error", errors: null, code: 500 };
  }
}
