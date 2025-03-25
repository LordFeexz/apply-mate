import { Badge } from "@/components/ui/badge";
import type { TransactionStatus } from "@/interfaces/payment";
import { cn } from "@/libs/utils";
import { memo } from "react";

export interface StatusBadgeProps {
  status: TransactionStatus;
}

function getStatusColor(status: TransactionStatus) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "failed":
    case "cancel":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("text-xs", getStatusColor(status))}>
      {status}
    </Badge>
  );
}

export default memo(StatusBadge);
