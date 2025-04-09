"use client";

import { memo, useActionState, useEffect, useRef } from "react";
import { generateOptimizeCvAction } from "../action";
import type { IGenerateCvState } from "../schema";
import type { LangProps } from "@/interfaces/component";
import dynamic from "next/dynamic";
import FormPart from "./form-part";
import useGeneratedCV from "../state";
const ResponseResult = dynamic(() => import("./response-result"), {
  ssr: false,
});

export interface GenerateCvFormProps extends LangProps {}

const initialState: IGenerateCvState = {
  cv: "",
  jobDesc: "",
  errors: {},
  error: "",
  generatedCv: "",
  recomendationLinks: [],
  keywords: [],
  tips: [],
  improvements: [],
};

function GenerateCvForm({ lang }: GenerateCvFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [
    {
      cv,
      jobDesc,
      error,
      generatedCv,
      recomendationLinks,
      keywords,
      tips,
      improvements,
    },
    formAction,
    pending,
  ] = useActionState(generateOptimizeCvAction, initialState);

  const { setContent, content } = useGeneratedCV();
  useEffect(() => {
    if (generatedCv) setContent(generatedCv);
  }, [generatedCv]);

  return (
    <form ref={ref} action={formAction} method="POST" className="space-y-8">
      {!!generatedCv ? (
        <ResponseResult
          originalCV={cv}
          improvements={improvements}
          lang={lang}
          generatedCv={content}
          recomendationLinks={recomendationLinks}
          keywords={keywords}
          tips={tips}
        />
      ) : (
        <FormPart loading={pending} lang={lang} cv={cv} jobDesc={jobDesc} />
      )}
      {error && (
        <div className="flex justify-center items-center">
          <p className="text-red-500 text-sm antialiased animate-pulse duration-1000">
            {error}
          </p>
        </div>
      )}
    </form>
  );
}

export default memo(GenerateCvForm);
