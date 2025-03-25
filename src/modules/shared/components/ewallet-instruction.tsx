import type { LangProps } from "@/interfaces/component";
import { getEwalletInstructionDictionary } from "../i18n";
import { memo } from "react";
import { cn } from "@/libs/utils";

export interface EwalletInstructionProps extends LangProps {
  className?: string;
}

function EwalletInstruction({ lang, className }: EwalletInstructionProps) {
  const { note } = getEwalletInstructionDictionary(lang);
  return (
    <div
      className={cn(
        "mt-auto p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-amber-700 dark:text-amber-400 w-full max-w-[250px]",
        className
      )}
    >
      <p className="text-xs font-medium text-center">{note}</p>
    </div>
  );
}

export default memo(EwalletInstruction);
