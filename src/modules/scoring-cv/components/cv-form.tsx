"use client";

import DefaultLoader from "@/components/common/default-loader";
import FileParserBtn, {
  type OnFailedHandler,
  type OnSuccessHandler,
} from "@/components/common/file-parser-btn";
import { Textarea } from "@/components/ui/textarea";
import type { LangProps } from "@/interfaces/component";
import { useSearchParams } from "next/navigation";
import { memo, Suspense, useState, type ChangeEventHandler } from "react";
import { toast } from "sonner";
import { getCvDictionary } from "../i18n";

export interface CvFormProps extends LangProps {
  defaultValue?: string;
}

function CvForm({ lang, defaultValue = "" }: CvFormProps) {
  const { placeholder, fileFormat } = getCvDictionary(lang);
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(
    searchParams.get("cv") ?? defaultValue
  );

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setValue(e.target.value);

  const onSuccessHandler: OnSuccessHandler = (parsed) => {
    toast.info("Uploaded");
    setValue(parsed.trim());
  };

  const onFailedHandler: OnFailedHandler = ({ message }) => {
    toast.error(message);
  };

  return (
    <div className="p-4">
      <Suspense fallback={<DefaultLoader />}>
        <Textarea
          value={value}
          name="cv"
          minLength={50}
          placeholder={placeholder}
          className="h-[200px] mb-4"
          id="cv"
          onChange={onChangeHandler}
          required
          aria-required
          rows={8}
        />
      </Suspense>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{fileFormat}</p>
        <FileParserBtn
          inputProps={{}}
          onSuccessHandler={onSuccessHandler}
          onFailedHandler={onFailedHandler}
        />
      </div>
    </div>
  );
}

export default memo(CvForm);
