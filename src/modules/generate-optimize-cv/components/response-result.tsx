import AnimateContainer from "@/components/common/animate-container";
import { memo } from "react";
import DownloadResultBtn from "./download-result-btn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
const CVRichEditor = dynamic(() => import("./cv-rich-editor"));
import type { LangProps } from "@/interfaces/component";
import type { CVGeneratingResult } from "@/interfaces/ai";
import HyperlinkCard from "./hyperlink-card";
import MatchKeywordCard from "@/modules/shared/components/match-keyword-card";
import EditingTipsCard from "./editing-tips-card";
const ImprovedCard = dynamic(() => import("./improved-card"));

export interface ResponseResultProps extends LangProps, CVGeneratingResult {
  originalCV: string;
}

function ResponseResult({
  generatedCv,
  lang,
  keywords,
  tips,
  recomendationLinks,
  improvements,
}: ResponseResultProps) {
  return (
    <AnimateContainer className="space-y-6">
      <div className="flex justify-start p-2 items-center">
        <DownloadResultBtn md={generatedCv} />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 overflow-hidden border-2 shadow-lg hover:scale-101 hover:shadow-lg transition-all duration-300">
          <CardHeader className="p-4 bg-secondary/50 border-b flex justify-between items-center">
            <hgroup className="flex items-center gap-2">
              <FileText size={16} />
              <span className="font-medium">Optimized CV</span>
            </hgroup>
          </CardHeader>
          <CardContent>
            <CVRichEditor lang={lang} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <HyperlinkCard lang={lang} recomendationLinks={recomendationLinks} />

          <MatchKeywordCard lang={lang} keywords={keywords} />

          <EditingTipsCard lang={lang} tips={tips} />
        </div>
      </div>

      {!!improvements.length && (
        <ImprovedCard lang={lang} improvements={improvements} />
      )}
    </AnimateContainer>
  );
}

export default memo(ResponseResult);
