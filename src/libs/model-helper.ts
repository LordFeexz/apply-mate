import { toZonedTime } from "date-fns-tz";

export const isValidPremium = (start: Date, end: Date) =>
  start.getTime() < end.getTime();

export const isRemainingPremium = (end: Date | null) => {
  if (!end) return false;

  const now = new Date();

  return (
    toZonedTime(now, "Asia/Jakarta").getTime() <
    toZonedTime(end, "Asia/Jakarta").getTime()
  );
};
