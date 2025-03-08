"use server";

import { parseCV } from "@/libs/utils";
import { SCHEMA_FILE } from "./schema";

export async function cvToString(cv: File) {
  const { success, error, data: file } = await SCHEMA_FILE.safeParseAsync(cv);

  if (!success)
    return {
      code: 400,
      message: "Bad Request",
      errors: {
        file: error.format()._errors,
      },
      data: null,
    };

  const data = await parseCV(file);
  if (!data)
    return {
      code: 500,
      message: "Failed to parse cv",
      errors: null,
      data: null,
    };

  return {
    code: 200,
    message: "ok",
    errors: null,
    data,
  };
}
