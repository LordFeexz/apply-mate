"use client";

import { EVENT_NAME } from "@/constants/event";
import { submitEvent } from "@/helpers/event";
import GTM from "@/libs/gtm";
import { usePathname } from "next/navigation";
import { memo, useEffect } from "react";

function Init() {
  const pathname = usePathname();
  useEffect(() => {
    GTM.initialize({ gtmId: "GTM-5WFP3BNX" });
  }, []);

  useEffect(() => {
    submitEvent(EVENT_NAME.OPEN_PAGE, {
      url: pathname,
      timestamp: new Date().toISOString(),
    });
  }, [pathname]);

  return null;
}

export default memo(Init);
