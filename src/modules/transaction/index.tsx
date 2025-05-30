import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import type { TransactionAttributes } from "@/models/transaction";
import { memo, Suspense, use } from "react";
import dynamic from "next/dynamic";
const TransactionCard = dynamic(() => import("./components/transaction-card"));
import SsrPagination from "@/components/common/ssr-pagination";
import { getTransactionDictionary } from "./i18n";

export interface TransactionPageProps extends LangProps {
  data: Promise<{ transactions: TransactionAttributes[]; totalPage: number }>;
  page: number;
  limit: number;
}

function TransactionPage({ data, page, lang, limit }: TransactionPageProps) {
  const { title, notFoundStage } = getTransactionDictionary(lang);
  const { transactions = [], totalPage } = use(data);

  return (
    <Card as="section" id="transaction">
      <CardHeader>
        <CardTitle as="h2" className="text-xl font-semibold mb-6">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 min-h-[50svh] overflow-x-scroll">
        <Suspense>
          {transactions.length ? (
            transactions.map((transaction) => (
              <TransactionCard
                lang={lang}
                transaction={transaction}
                key={transaction.id}
              />
            ))
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-sm">{notFoundStage}</p>
            </div>
          )}
        </Suspense>
      </CardContent>
      <CardFooter>
        <Suspense>
          <SsrPagination
            page={page}
            limit={limit}
            totalPage={totalPage}
            wrapperClassName="mt-6"
          />
        </Suspense>
      </CardFooter>
    </Card>
  );
}

export default memo(TransactionPage);
