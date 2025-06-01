import BackBtn from "@/components/common/back-btn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencyFormatterID } from "@/constants/formatter";
import type { LangProps } from "@/interfaces/component";
import type { TransactionAttributes } from "@/models/transaction";
import { format } from "date-fns";
import { Calendar, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { memo, Suspense, use } from "react";
import TransactionBreadcrumb from "./components/transaction-breadcrumb";
import { getTransactionDetailDictionary } from "./i18n";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import type { CustomSession } from "@/interfaces/global";
const CancelBtn = dynamic(() => import("./components/cancel-btn"));
const PayBtn = dynamic(() => import("./components/pay-btn"));
import TransactionDetailLoading from "./loading";

export interface TransactionDetailProps extends LangProps {
  data: Promise<TransactionAttributes | null>;
  session: CustomSession;
}

function TransactionDetail({ data, lang, session }: TransactionDetailProps) {
  const transaction = use(data);
  if (!transaction) notFound();

  if (transaction.user_id !== session.user.id)
    redirect(`/${lang}/account/transaction`);

  const { title, transactionId, date, status, amount, provider } =
    getTransactionDetailDictionary(lang);
  return (
    <Suspense fallback={<TransactionDetailLoading />}>
      <Card>
        <CardHeader className="flex flex-col mb-2 space-y-4">
          <TransactionBreadcrumb lang={lang} />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <CardTitle as="h2" className="text-xl font-semibold">
              {title}
            </CardTitle>
            <BackBtn />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <hgroup className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="text-sm text-muted-foreground">{transactionId}</h3>
              <p className="font-mono text-xs md:text-sm">{transaction.id}</p>
            </hgroup>
            <hgroup className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
              </h3>
              <p>{format(new Date(transaction.created_at), "yyyy-MM-dd")}</p>
            </hgroup>
            <hgroup className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="flex items-center text-sm text-muted-foreground">
                <div className="mr-1">
                  {transaction.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : transaction.status === "pending" ? (
                    <HelpCircle className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <span>{status}</span>
              </h3>
              <p className="capitalize">{transaction.status}</p>
            </hgroup>
            <hgroup className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="text-sm text-muted-foreground">{amount}</h3>
              <p className="text-lg font-bold">
                {currencyFormatterID.format(transaction.amount)}
              </p>
            </hgroup>
            <hgroup className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="text-sm text-muted-foreground">{provider}</h3>
              <p className="text-lg">{transaction.detail?.provider}</p>
            </hgroup>
          </div>
        </CardContent>
        {transaction.status === "pending" && (
          <CardFooter className="p-6">
            <div className="flex flex-row justify-between md:justify-end w-full space-x-2 items-center">
              <PayBtn transaction={transaction} lang={lang} />
              <CancelBtn transactionId={transaction.id} lang={lang} />
            </div>
          </CardFooter>
        )}
      </Card>
    </Suspense>
  );
}

export default memo(TransactionDetail);
