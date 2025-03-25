import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import { getTransactionDetailBreadcrumbDictionary } from "../i18n";

export interface TransactionBreadcrumbProps extends LangProps {}

function TransactionBreadcrumb({ lang }: TransactionBreadcrumbProps) {
  const { home, detail, transaction } =
    getTransactionDetailBreadcrumbDictionary(lang);

  return (
    <Breadcrumb>
      <BreadcrumbList className="w-full">
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${lang}`} className="text-xs md:text-sm">
            {home}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis className="text-xs md:text-sm" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/${lang}/account/transaction`}
            className="text-xs md:text-sm"
          >
            {transaction}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-xs md:text-sm">
            {detail}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default memo(TransactionBreadcrumb);
