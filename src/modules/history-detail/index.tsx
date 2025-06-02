import type { LangProps } from "@/interfaces/component";
import type { CustomSession } from "@/interfaces/global";
import type { ResultAttributes } from "@/models/result";
import { notFound, redirect } from "next/navigation";
import { memo, Suspense, use } from "react";
import HistoryDetailLoading from "./loading";
import BackBtn from "@/components/common/back-btn";
import ItemIcon from "../history/components/item-icon";
import ItemBadge from "../history/components/item-badge";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import DetailTab from "./components/detail-tab";
import dynamic from "next/dynamic";
const ResultTab = dynamic(() => import("./components/result-tab"));
const InputTab = dynamic(() => import("./components/input-tab"));

export interface HistoryDetailPageProps extends LangProps {
  result: Promise<ResultAttributes | null>;
  session: CustomSession;
}

function HistoryDetailPage({ result, session, lang }: HistoryDetailPageProps) {
  const data = use(result);
  if (!data) notFound();

  if (data.user_id !== session.user.id) redirect(`/${lang}/account/history`);

  return (
    <Suspense fallback={<HistoryDetailLoading />}>
      <section id="history-detail" className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <BackBtn />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
            <hgroup className="antialiased">
              <div className="flex items-center gap-2 mb-2">
                <ItemIcon feature={data.feature} />
                <ItemBadge feature={data.feature} />
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {format(new Date(data.created_at), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{format(new Date(data.created_at), "HH:mm")}</span>
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold capitalize">
                {data.feature.replaceAll("-", " ")}
              </h2>
            </hgroup>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <DetailTab
              lang={lang}
              inputTab={<InputTab data={data.user_input} />}
              resultTab={
                <ResultTab
                  data={data.data}
                  feature={data.feature}
                  lang={lang}
                />
              }
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default memo(HistoryDetailPage);
