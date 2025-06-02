"use client";

import ResponseResult, {
  type ResponseResultProps,
} from "@/modules/generate-optimize-cv/components/response-result";
import useGeneratedCV from "@/modules/generate-optimize-cv/state";
import { memo, useEffect } from "react";

export interface GeneratedCvResultWrapperProps extends ResponseResultProps {}

function GeneratedCvResultWrapper({
  generatedCv,
  ...rest
}: GeneratedCvResultWrapperProps) {
  const { setContent } = useGeneratedCV();
  useEffect(() => {
    if (generatedCv) setContent(generatedCv);
  }, [generatedCv]);

  return <ResponseResult {...rest} generatedCv={generatedCv} />;
}

export default memo(GeneratedCvResultWrapper);
