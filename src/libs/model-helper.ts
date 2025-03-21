export const isValidPremium = (start: Date, end: Date) =>
  start.getTime() < end.getTime();
