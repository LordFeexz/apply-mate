import type { Result } from "@/models";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemIcon from "./ItemIcon";
import ItemBadge from "./ItemBadge";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Calendar, Clock, Eye } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { LangProps } from "@/interfaces/component";

export interface HistoryCardProps extends LangProps {
  data: Omit<Result, "data" | "user_input">;
}

function HistoryCard({ data, lang }: HistoryCardProps) {
  return (
    <Card
      as="article"
      className="overflow-hidden hover:shadow-md transition-shadow"
      data-id={data.id}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <ItemIcon feature={data.feature} />
            <ItemBadge feature={data.feature} />
          </div>
          <Button>DOWNLOAD</Button>
        </div>
        <CardTitle className="text-lg mt-2">{data.feature}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1 mb-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(new Date(data.created_at), "dd/MM/yyyy")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{format(new Date(data.created_at), "HH:mm")}</span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-3">
        <Link
          href={`/${lang}/account/history/${data.id}`}
          prefetch
          className="w-full"
        >
          <Button variant="outline" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default memo(HistoryCard);
