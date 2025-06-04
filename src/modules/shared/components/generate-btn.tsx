"use client";

import SubmitBtn, { type SubmitBtnProps } from "@/components/common/submit-btn";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
import useSharedStore from "../store";
import { PAYG_PAYMENT } from "@/enums/global";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ChildrenProps, LangProps } from "@/interfaces/component";
import { getSubscribeBtnDictionary } from "../i18n";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getPAYGPrice } from "@/libs/utils";
import { isRemainingPremium } from "@/libs/model-helper";
import { submitEvent } from "@/helpers/event";
import { EVENT_NAME } from "@/constants/event";
const PaymentModal = dynamic(() => import("./payment-modal"), { ssr: false });

export interface GenerateBtnProps
  extends Omit<SubmitBtnProps, "lang" | "children">,
    LangProps,
    ChildrenProps {
  feature: PAYG_PAYMENT;
}

function GenerateBtn({ disabled, lang, feature, ...rest }: GenerateBtnProps) {
  const { dialogDesc, quickPayment } = getSubscribeBtnDictionary(lang);
  const { data } = useSharedStore();
  const [open, setOpen] = useState<boolean>(false);
  const { status } = useSession();
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && data?.pay_as_you_go_payments?.some((el) => el === feature)) {
      ref.current?.click();
      setOpen(false);
    }
  }, [open, data?.pay_as_you_go_payments, feature]);

  const onClickHandler: MouseEventHandler = useCallback(
    (e) => {
      submitEvent(EVENT_NAME.GENERATE_BTN_CLICK, {
        feature,
        status,
        data,
        timestamp: new Date().toISOString(),
      });
      if (status === "unauthenticated") router.push(`/${lang}/sign-in`);

      if (
        !data ||
        (data?.premium_end_date &&
          !isRemainingPremium(data.premium_end_date)) ||
        (!data?.premium_start_date &&
          !data?.premium_end_date &&
          data?.points < getPAYGPrice(feature) &&
          !data?.pay_as_you_go_payments?.some((el) => el === feature))
      ) {
        e.preventDefault();
        setOpen(true);
      }
    },
    [data, setOpen, feature, status, router, lang]
  );

  return (
    <>
      <SubmitBtn
        {...rest}
        ref={ref}
        onClick={onClickHandler}
        disabled={disabled || status !== "authenticated"}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{quickPayment}</DialogTitle>
            <DialogDescription>{dialogDesc}</DialogDescription>
          </DialogHeader>
          <PaymentModal lang={lang} feature={feature} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(GenerateBtn);
