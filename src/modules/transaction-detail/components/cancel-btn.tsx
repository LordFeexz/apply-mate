"use client";

import { Button } from "@/components/ui/button";
import useCSRF from "@/hooks/use-csrf";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import {
  memo,
  useCallback,
  useTransition,
  type MouseEventHandler,
} from "react";
import { cancelTransaction } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { LangProps } from "@/interfaces/component";
import { LANG } from "@/enums/global";

export interface CancelBtnProps extends LangProps {
  transactionId: string;
}

function CancelBtn({ transactionId, lang }: CancelBtnProps) {
  const router = useRouter();
  const csrf = useCSRF();
  const [pending, startTransition] = useTransition();
  const onClickHandler: MouseEventHandler = useCallback(() => {
    startTransition(async () => {
      const { message, code } = await cancelTransaction(transactionId, csrf);

      toast[code === 200 ? "success" : "error"](message);
      router.back();
    });
  }, [transactionId, csrf, router]);

  return (
    <Button
      onClick={onClickHandler}
      variant="destructive"
      className={cn(
        "hover:scale-98 transition-all duration-300 hover:shadow shadow-lg hover:opacity-90 cursor-pointer",
        pending ? "cursor-wait" : "cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "min-w-20 text-sm"
      )}
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : lang === LANG.ID ? (
        "Batal"
      ) : (
        "Cancel"
      )}
    </Button>
  );
}

export default memo(CancelBtn);
