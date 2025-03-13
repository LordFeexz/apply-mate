import QueryStateTextarea from "@/components/common/query-state-textarea";
import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { cn } from "@/libs/utils";
import { memo } from "react";

export interface JobDescFormProps extends LangProps {
  defaultValue?: string;
  className?: string;
}

function JobDescForm({ defaultValue, lang, className }: JobDescFormProps) {
  return (
    <div className="p-4">
      <QueryStateTextarea
        controlled={false}
        placeholder={
          lang === LANG.ID
            ? "Copas deskripsi pekerjaan disini"
            : "Paste the job description here..."
        }
        className={cn("h-[200px] mb-4", className)}
        name="jobDesc"
        aria-required
        required
        rows={8}
        aria-multiline
        minLength={50}
        maxLength={5000}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default memo(JobDescForm);
