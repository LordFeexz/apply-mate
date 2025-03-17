"use client";

import type { LangProps } from "@/interfaces/component";
import { memo, Suspense, useActionState, useRef } from "react";
import { getJobDescDictionary, getScoringFormDictionary } from "../i18n";
import CvForm from "@/modules/shared/components/cv-form";
import DefaultLoader from "@/components/common/default-loader";
import CardInputContainer from "@/modules/shared/components/card-input-container";
import JobDescForm from "@/modules/shared/components/job-desc-form";
import SubmitBtn from "@/components/common/submit-btn";
import dynamic from "next/dynamic";
import InputLangBtn from "@/components/common/input-lang-btn";
import type { IScoringState } from "../schema";
import { generateCvScoringAction } from "../action";
const ScoringResponse = dynamic(() => import("./score-response"), {
  ssr: false,
});

export interface ScoringFormProps extends LangProps {}

const initialState: IScoringState & { parsed: boolean } = {
  score: 0,
  missingKeywords: [],
  matchingKeywords: [],
  explanation: "",
  errors: {},
  error: "",
  cv: "",
  jobDesc: "",
  lang: "English",
  parsed: false,
};

function ScoringForm({ lang }: ScoringFormProps) {
  const { cvDesc, cvLabel } = getScoringFormDictionary(lang);
  const { title, desc } = getJobDescDictionary(lang);
  const ref = useRef<HTMLFormElement>(null);
  const [
    {
      score = 0,
      missingKeywords = [],
      matchingKeywords = [],
      explanation = "",
      parsed,
      error,
      cv,
      jobDesc,
      lang: selectedLang,
    },
    formAction,
    loading,
  ] = useActionState(generateCvScoringAction, initialState);

  return (
    <>
      <form ref={ref} className="space-y-8" action={formAction}>
        <div className="grid gap-8 md:grid-cols-2">
          <CardInputContainer
            className="col-span-2 md:col-span-1"
            title={cvLabel}
            desc={cvDesc}
          >
            <Suspense fallback={<DefaultLoader />}>
              <CvForm defaultValue={cv} lang={lang} />
            </Suspense>
          </CardInputContainer>
          <CardInputContainer
            className="col-span-2 md:col-span-1"
            title={title}
            desc={desc}
          >
            <JobDescForm defaultValue={jobDesc} lang={lang} />
          </CardInputContainer>
          <div className="col-span-2 flex justify-center items-center">
            <InputLangBtn
              defaultValue={selectedLang}
              name="lang"
              id="lang"
              required
              aria-required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <SubmitBtn
            disabled={loading}
            size="lg"
            className="rounded-full px-8 gap-2 w-1/2"
          >
            Submit
          </SubmitBtn>
        </div>
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-red-500 text-sm antialiased animate-pulse duration-1000">
              {error}
            </p>
          </div>
        )}
      </form>
      {parsed && (
        <ScoringResponse
          score={score}
          missingKeywords={missingKeywords}
          keywordMatches={matchingKeywords}
          lang={lang}
          explanation={explanation}
        />
      )}
    </>
  );
}

export default memo(ScoringForm);
