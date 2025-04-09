import "server-only";
import type { PAYG_PAYMENT } from "@/enums/global";
import {
  GenerateProfile,
  type GenerateProfileAttributes,
} from "@/models/generate_profile";
import { isRemainingPremium } from "./model-helper";
import { getPAYGPrice } from "./utils";
import type { Transaction } from "sequelize";

export function canGenerate(
  generateProfile: GenerateProfileAttributes,
  feature: PAYG_PAYMENT,
  transaction?: Transaction
) {
  const price = getPAYGPrice(feature);
  const isRemain = generateProfile?.premium_end_date
    ? isRemainingPremium(generateProfile.premium_end_date)
    : null;

  if (generateProfile.premium_end_date && !isRemain)
    GenerateProfile.update(
      { premium_end_date: null, premium_start_date: null },
      { where: { id: generateProfile.id }, transaction }
    );

  return !(
    !generateProfile ||
    (generateProfile?.premium_end_date && !isRemain) ||
    (!generateProfile?.premium_start_date &&
      !generateProfile?.premium_end_date &&
      +generateProfile?.points < price &&
      !generateProfile?.pay_as_you_go_payments?.some((el) => el === feature))
  );
}
