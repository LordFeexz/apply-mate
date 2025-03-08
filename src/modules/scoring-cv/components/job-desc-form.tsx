import QueryStateTextarea from "@/components/common/query-state-textarea";
import { memo } from "react";

export interface JobDescFormProps {
  defaultValue?: string;
}

function JobDescForm({ defaultValue }: JobDescFormProps) {
  return (
    <div className="p-4">
      <QueryStateTextarea
        controlled={false}
        placeholder="Paste the job description here..."
        className="h-[200px] mb-4"
        name="jobDesc"
        aria-required
        required
        rows={8}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default memo(JobDescForm);
