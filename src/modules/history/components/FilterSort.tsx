"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import useHistoryParams from "../store";
import { ArrowUpDown } from "lucide-react";
import { memo, useCallback } from "react";
import type { LangProps } from "@/interfaces/component";
import { useRouter } from "next/navigation";

export interface FilterSortProps extends LangProps {
  page: number;
  limit: number;
}

function FilterSort({ lang, page, limit }: FilterSortProps) {
  const { sort, setSort, type } = useHistoryParams();
  const router = useRouter();
  const onValueChange = useCallback(
    async (sort: string) => {
      setSort(sort);
      router.push(
        `/${lang}/account/history?${new URLSearchParams({ page: String(page), limit: String(limit), sort, type }).toString()}`
      );
    },
    [lang, page, limit, setSort, router]
  );

  return (
    <Select value={sort} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px]">
        <div className="flex items-center">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          <span>Sort</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ASC">Ascending</SelectItem>
        <SelectItem value="DESC">Descending</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default memo(FilterSort);
