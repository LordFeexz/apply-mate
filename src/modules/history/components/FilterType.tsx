"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { memo, useCallback } from "react";
import useHistoryParams from "../store";
import { Filter } from "lucide-react";
import { FEATURE } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { useRouter } from "next/navigation";

export interface FilterTypeProps extends LangProps {}

function FilterType({ lang }: FilterTypeProps) {
  const { type, setType, sort } = useHistoryParams();
  const router = useRouter();
  const onValueChange = useCallback(
    async (type: string) => {
      setType(type);
      router.push(
        `/${lang}/account/history?${new URLSearchParams({ type, page: "1", limit: "9", sort }).toString()}`
      );
    },
    [lang, type, setType, sort, router]
  );

  return (
    <Select value={type} onValueChange={onValueChange}>
      <SelectTrigger className="w-[160px]">
        <div className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          <span>Filter</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(FEATURE).map((feature) => (
          <SelectItem
            value={FEATURE[feature as keyof typeof FEATURE]}
            key={feature}
            className="cursor-pointer lowercase"
          >
            {FEATURE[feature as keyof typeof FEATURE].replaceAll("-", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default memo(FilterType);
