import type { CustomSession } from "@/interfaces/global";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useSharedStore from "../store";
import { isValid } from "date-fns";
import { SSE_SUBSCRIBE_PAYMENT_TYPE } from "../constant";

export default function useSubscribePayment() {
  const { status, data: session } = useSession();
  const { data, setData } = useSharedStore();

  useEffect(() => {
    if (status === "authenticated") {
      const eventSource = new EventSource(
        `/api/subscribe-payment?user_id=${(session as CustomSession)?.user?.id}`
      );

      eventSource.onmessage = (e) => {
        e.preventDefault();
        if (data) {
          try {
            const { premium_start_date, premium_end_date, type } = JSON.parse(
              e.data
            );
            if (type !== SSE_SUBSCRIBE_PAYMENT_TYPE) return;

            let current = { ...data };

            if (isValid(new Date(premium_start_date)))
              current.premium_start_date = premium_start_date;

            if (isValid(new Date(premium_end_date)))
              current.premium_end_date = premium_end_date;

            setData(current);
          } catch (err) {
            return;
          }
        }
      };

      eventSource.onerror = (err) => {
        console.error(err);
        if (eventSource.readyState !== eventSource.CLOSED) eventSource.close();
      };

      return () => {
        if (eventSource.readyState !== eventSource.CLOSED) eventSource.close();
      };
    }
  }, [status, session, data, setData]);
}
