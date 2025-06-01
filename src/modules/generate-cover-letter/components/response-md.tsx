import CopyBtn from "@/components/common/copy-btn";
import Markdown from "@/components/common/markdown";
import type { LangProps } from "@/interfaces/component";
import { cn, markdownToText } from "@/libs/utils";
import { memo } from "react";

export interface ResponseMdProps extends LangProps {
  response: string;
  loading: boolean;
}

function ResponseMd({ loading, response, lang }: ResponseMdProps) {
  return (
    <div className={cn("space-x-4", loading && "opacity-50")}>
      <div className="flex justify-end items-center">
        <CopyBtn
          textToCopy={markdownToText(response)}
          lang={lang}
          disabled={loading}
          className="min-w-48"
        />
      </div>
      <Markdown content={response} />
    </div>
  );
}

export default memo(ResponseMd);
