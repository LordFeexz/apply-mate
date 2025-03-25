import { ITEM } from "@/enums/plan";
import { cn } from "@/libs/utils";
import type { TransactionAttributes } from "@/models/transaction";
import { Calendar, ChevronRight, Clock, CreditCard } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { format } from "date-fns";
import StatusBadge from "./status-badge";
import { currencyFormatterID } from "@/constants/formatter";
import type { LangProps } from "@/interfaces/component";

export interface TransactionCardProps extends LangProps {
  transaction: TransactionAttributes;
}

function TransactionCard({ transaction, lang }: TransactionCardProps) {
  return (
    <Link
      href={`/${lang}/account/transaction/${transaction.id}`}
      passHref
      prefetch
      className="w-full"
    >
      <article className="flex items-center overflow-x-scroll overflow-y-hidden justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "p-2 rounded-full",
              transaction.status === "completed" ||
                transaction.status === "settlement"
                ? "bg-green-100 dark:bg-green-900/30"
                : transaction.status === "pending"
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            )}
          >
            {transaction.detail?.item === ITEM.SUBSCRIPTION ? (
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <hgroup className="antialiased">
            <p className="font-medium">
              {transaction.detail?.item === ITEM.SUBSCRIPTION
                ? "Monthly Subscription"
                : "Pay As You Go"}
            </p>
            <p className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {format(new Date(transaction.created_at), "yyyy-MM-dd")}
            </p>
          </hgroup>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium">
              {currencyFormatterID.format(transaction.amount)}
            </p>
            <StatusBadge status={transaction.status} />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </article>
    </Link>
  );
}

export default memo(TransactionCard);
