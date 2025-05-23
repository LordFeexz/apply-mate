import SsrPagination from "@/components/common/ssr-pagination";
import type { LangProps } from "@/interfaces/component";
import type { Result } from "@/models";
import { memo, Suspense, use } from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Init from "./Init";
import FilterType from "./components/FilterType";
import FilterSort from "./components/FilterSort";
const HistoryCard = dynamic(() => import("./components/HistoryCard"));
const NoData = dynamic(() => import("./components/NoData"));

export interface HistoryPageProps extends LangProps {
  histories: Promise<{
    data: Omit<Result, "data" | "user_input">[];
    totalPage: number;
    count: number;
  }>;
  page: number;
  limit: number;
  q?: string;
  sort?: string;
}

function HistoryPage({
  lang,
  histories,
  page,
  limit,
  q,
  sort,
}: HistoryPageProps) {
  const { data, count, totalPage } = use(histories);

  return (
    <section className="container mx-auto py-8 px-4">
      <Init page={page} limit={limit} q={q} sort={sort} />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <hgroup>
          <h2 className="text-3xl font-bold">Generation History</h2>
          <p className="text-muted-foreground">
            View and manage your previously generated documents
          </p>
        </hgroup>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, job, or company..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <FilterType lang={lang} />
          <FilterSort page={page} limit={limit} lang={lang} />
        </div>
      </div>
      <Suspense>
        <div className="text-sm text-muted-foreground mb-4">
          Showing {data.length} of {count} results
        </div>
      </Suspense>
      <Suspense>
        {data.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.map((history) => (
              <HistoryCard key={history.id} data={history} lang={lang} />
            ))}
          </div>
        ) : (
          <NoData lang={lang} />
        )}
      </Suspense>
      <Suspense>
        <SsrPagination
          page={page}
          limit={limit}
          totalPage={totalPage}
          wrapperClassName="mt-6"
        />
      </Suspense>
    </section>
  );
}

export default memo(HistoryPage);
