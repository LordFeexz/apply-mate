import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { getLoginPageDictionary } from "./i18n";
import BackOnAuthenticated from "@/components/lifecycle/back-on-authenticated";
import GoggleLoginBtn from "./components/goggle-login-btn";

export interface SigninPageProps extends LangProps {}

function SignInPage({ lang }: SigninPageProps) {
  const { term, title, desc, agree, privacy, and } =
    getLoginPageDictionary(lang);

  return (
    <section className="flex items-center justify-center min-h-[80vh] px-4">
      <BackOnAuthenticated />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">{desc}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <GoggleLoginBtn lang={lang} />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {agree}{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              {term}
            </Link>{" "}
            {and}{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              {privacy}
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default memo(SignInPage);
