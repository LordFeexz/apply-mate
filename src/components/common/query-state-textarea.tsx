"use client";

import { memo, type ComponentProps } from "react";
import { Textarea } from "../ui/textarea";
import { useSearchParams } from "next/navigation";

export interface QueryStateTextareaProps extends ComponentProps<"textarea"> {
  name: string;
  controlled?: boolean;
}

function QueryStateTextarea({
  name,
  controlled = false,
  value,
  defaultValue,
  ...rest
}: QueryStateTextareaProps) {
  const searchParams = useSearchParams();
  const val = searchParams.get(name) ?? value ?? defaultValue;

  return (
    <Textarea
      {...rest}
      name={name}
      {...(controlled ? { value: val } : { defaultValue: val })}
    />
  );
}

export default memo(QueryStateTextarea);
