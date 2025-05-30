"use client";

import GoogleOauth from "@/components/providers/goggle-oauth";
import useMount from "@/hooks/use-mount";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useTheme } from "next-themes";
import { memo, useCallback, useTransition } from "react";
import { googleLoginAction } from "../action";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import type { LangProps } from "@/interfaces/component";
import { getGoogleLoginBtnDictionary } from "../i18n";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";

export interface GoggleLoginBtnProps extends LangProps {
  refresh?: boolean;
  onSuccess?: () => void;
}

function GoggleLoginBtn({
  lang,
  refresh = false,
  onSuccess,
}: GoggleLoginBtnProps) {
  const { somethingWentWrong, loginFailed, loginSuccess } =
    getGoogleLoginBtnDictionary(lang);
  const { theme } = useTheme();
  const { update } = useSession();
  const mount = useMount();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onSuccessHandler = useCallback(
    ({ credential }: CredentialResponse) => {
      startTransition(async () => {
        if (!credential) {
          toast.error(somethingWentWrong, { duration: 5000 });
          return;
        }

        const { data, message, code } = await googleLoginAction(credential);
        if (code === 200 && data) {
          const resp = await signIn("credentials", {
            access_token: data,
            redirect: false,
          });
          if (resp && resp?.ok) {
            toast.success(loginSuccess, { duration: 5000 });
            typeof onSuccess === "function" && onSuccess();
            await update();
            refresh ? router.refresh() : router.replace(`/${lang}/feature`);
            return;
          }

          toast.error(message ?? loginFailed, { duration: 5000 });
        }
      });
    },
    [router, update]
  );

  return (
    <section
      id="google-login"
      tabIndex={mount ? 0 : -1}
      aria-label="signin with google"
      aria-hidden={!mount}
      aria-busy={pending}
      aria-disabled={pending}
      aria-live="polite"
      aria-current="page"
      data-slot="google-login-btn"
    >
      {mount && (
        <GoogleOauth>
          <div className="flex flex-wrap bg-background flex-col p-0 space-y-2 justify-center items-center">
            <GoogleLogin
              containerProps={{
                className: cn(
                  "bg-background flex justify-center p-0 dark:rounded-md border-none overflow-hidden",
                  pending && "hidden"
                ),
              }}
              onSuccess={onSuccessHandler}
              useOneTap
              cancel_on_tap_outside
              theme={theme === "dark" ? "filled_black" : "outline"}
              text="signin_with"
              shape="square"
              size="large"
              context="signin"
              type="standard"
            />
            <Loader2
              className={cn("w-4 h-4 animate-spin", !pending && "hidden")}
            />
          </div>
        </GoogleOauth>
      )}
    </section>
  );
}

export default memo(GoggleLoginBtn);
