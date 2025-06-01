import type { CustomSession } from "@/interfaces/global";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import useSharedStore from "../store";
import { isValid } from "date-fns";
import { SSE_PAYG_PAYMENT_TYPE, SSE_SUBSCRIBE_PAYMENT_TYPE } from "../constant";

export default function usePayment() {
  const { status, data: session } = useSession();
  const { data, setData } = useSharedStore();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (status === "authenticated" && !eventSourceRef.current) {
      const eventSource = new EventSource(
        `/api/payment-listener?user_id=${(session as CustomSession)?.user?.id}`
      );
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (e) => {
        e.preventDefault();
        if (data) {
          try {
            const {
              premium_start_date,
              premium_end_date,
              type,
              pay_as_you_go_payments = [],
            } = JSON.parse(e.data);
            let current = { ...data };

            if (type === SSE_SUBSCRIBE_PAYMENT_TYPE) {
              if (isValid(new Date(premium_start_date)))
                current.premium_start_date = premium_start_date;

              if (isValid(new Date(premium_end_date)))
                current.premium_end_date = premium_end_date;
            }

            if (type === SSE_PAYG_PAYMENT_TYPE)
              current.pay_as_you_go_payments = pay_as_you_go_payments;

            setData(current);
          } catch (err) {
            return;
          }
        }
      };

      eventSource.onerror = (err) => {
        if (eventSource.readyState !== eventSource.CLOSED) eventSource.close();
      };

      return () => {
        if (eventSource.readyState !== eventSource.CLOSED) eventSource.close();
        if (eventSourceRef.current) {
          if (
            eventSourceRef.current.readyState !== eventSourceRef.current.CLOSED
          )
            eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };
    }
  }, [status, session, data, setData]);
}
