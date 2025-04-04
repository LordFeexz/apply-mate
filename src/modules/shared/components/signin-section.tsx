"use client";

import type { LangProps } from "@/interfaces/component";
import GoggleLoginBtn from "@/modules/signin/components/goggle-login-btn";
import { getSigninSectionDictionary } from "../i18n";
import { memo, useCallback } from "react";
import useSharedStore from "../store";
import { getCurrentProfile } from "../action";

export interface SigninSectionProps extends LangProps {}

function SigninSection({ lang }: SigninSectionProps) {
  const { title } = getSigninSectionDictionary(lang);
  const { setData, data } = useSharedStore();
  const onSuccess = useCallback(async () => {
    if (!data) setData(await getCurrentProfile());
  }, [data, setData]);

  return (
    <div className="flex justify-center flex-col items-center gap-2">
      <GoggleLoginBtn lang={lang} refresh onSuccess={onSuccess} />
      <p className="mt-6 text-center text-muted-foreground text-sm">{title}</p>
    </div>
  );
}

export default memo(SigninSection);
