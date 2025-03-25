import CopyBtn from "@/components/common/copy-btn";
import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import { getVaViewerDictionary } from "../i18n";
import { cn } from "@/libs/utils";

export interface VaViewerProps extends LangProps {
  va: string;
  className?: string;
}

function VaViewer({ va, lang, className }: VaViewerProps) {
  const { accountNo } = getVaViewerDictionary(lang);

  return (
    <div
      data-slot="va-viewer"
      data-testid="va-viewer"
      className={cn("bg-muted/50 p-3 rounded-md", className)}
    >
      <div className="text-sm text-muted-foreground mb-1 flex justify-between items-center">
        {accountNo}
        <CopyBtn
          type="button"
          variant="ghost"
          size="sm"
          textToCopy={va}
          className="h-8 px-2"
        />
      </div>
      <hgroup className="flex items-center justify-between">
        <p className="font-mono text-lg font-medium">{va}</p>
      </hgroup>
    </div>
  );
}

export default memo(VaViewer);
