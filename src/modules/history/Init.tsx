"use client";

import { memo, useEffect } from "react";
import useHistoryParams from "./store";

export interface InitProps {
  page: number;
  limit: number;
  q?: string;
  sort?: string;
}

function Init({ page, limit, q, sort }: InitProps) {
  const { setLimit, setPage, setQ, setSort } = useHistoryParams();
  useEffect(() => {
    setLimit(limit);
    setPage(page);
    setQ(q || "");
    setSort(sort || "");
  }, [page, limit, q, sort]);

  return null;
}

export default memo(Init);
