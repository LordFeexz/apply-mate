import type { ACCOUNT_TAB } from "@/enums/global";
import type { ChildrenProps, LangProps } from "@/interfaces/component";
import AccountTab from "./account-tab";
import { memo } from "react";
import { getAccountDictionary } from "./i18n";

export interface AccountLayoutProps extends LangProps, ChildrenProps {
  tab: ACCOUNT_TAB;
}

function AccountLayout({ tab, children, lang }: AccountLayoutProps) {
  const { title, desc } = getAccountDictionary(lang);
  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <hgroup className="antialiased">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{desc}</p>
        </hgroup>
      </div>
      <AccountTab lang={lang} tab={tab}>
        {children}
      </AccountTab>
    </section>
  );
}

export default memo(AccountLayout);
