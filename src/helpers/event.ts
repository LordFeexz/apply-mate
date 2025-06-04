import type { EVENT_NAME } from "@/constants/event";
import { analytics } from "@/libs/firebase";
import GTM from "@/libs/gtm";
import { logEvent } from "firebase/analytics";

export const submitEvent = (
  name: EVENT_NAME,
  args: Record<string, unknown>
) => {
  analytics && logEvent(analytics, name, args);
  GTM.dataLayer({ dataLayer: { ...args, event: name } });
};
