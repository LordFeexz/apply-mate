"use client";

import { cn } from "@/libs/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { memo, useMemo } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export interface SSRPaginationProps {
  wrapperClassName?: string;
  page: number;
  limit: number;
  totalPage: number;
}

function generatePageQuery(
  searchParams: ReadonlyURLSearchParams,
  newPage: number
) {
  const current = new URLSearchParams(searchParams);
  current.set("page", String(newPage));

  return current.toString();
}

function SSRPagination({
  wrapperClassName,
  page,
  limit,
  totalPage,
}: SSRPaginationProps) {
  const searchParams = useSearchParams();
  const previousQuery = useMemo(
    () => generatePageQuery(searchParams, page - 1),
    [searchParams, page]
  );

  const nextQuery = useMemo(
    () => generatePageQuery(searchParams, page + 1),
    [page, searchParams]
  );

  const paginationItems = useMemo(() => {
    const items = [];
    const maxItems = 5;

    let startPage = Math.max(1, page - Math.floor(maxItems / 2));
    let endPage = Math.min(totalPage, startPage + maxItems - 1);

    for (let i = startPage; i <= endPage; i++)
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?${generatePageQuery(searchParams, i)}`}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );

    return items;
  }, [page, totalPage, searchParams]);

  return (
    <Pagination
      className={cn("flex justify-center items-center", wrapperClassName)}
    >
      <PaginationContent>
        <PaginationItem disable={page <= 1}>
          <PaginationPrevious
            aria-disabled={page <= 1}
            href={`?${previousQuery}`}
          />
        </PaginationItem>

        {paginationItems}

        <PaginationItem disable={page >= totalPage}>
          <PaginationNext
            aria-disabled={page >= totalPage}
            href={`?${nextQuery}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default memo(SSRPagination);
