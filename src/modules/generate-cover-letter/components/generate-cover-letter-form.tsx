"use client";

import DefaultLoader from "@/components/common/default-loader";
import type { LangProps } from "@/interfaces/component";
import { getScoringFormDictionary } from "@/modules/scoring-cv/i18n";
import CardInputContainer from "@/modules/shared/components/card-input-container";
import CvForm from "@/modules/shared/components/cv-form";
import JobDescForm from "@/modules/shared/components/job-desc-form";
import { getJobDescDictionary } from "@/modules/shared/i18n";
import { memo, Suspense, useActionState } from "react";
import CompanyDetailForm from "./company-detail-form";
import InputLangBtn from "@/components/common/input-lang-btn";
import dynamic from "next/dynamic";
import GenerateBtn from "@/modules/shared/components/generate-btn";
import { PAYG_PAYMENT } from "@/enums/global";
import CsrfInput from "@/components/common/csrf-input";
import type { IGenerateCoverLetterState } from "../schema";
import { generateCoverLetterAction } from "../action";
const ResponseCard = dynamic(() => import("./response-card"), { ssr: false });

export interface GenerateCoverLetterFormProps extends LangProps {}

const initialState: IGenerateCoverLetterState = {
  response: "",
  errors: {},
  error: "",
  cv: "",
  jobDesc: "",
  lang: "English",
  role: "",
  company: "",
};

function GenerateCoverLetterForm({ lang }: GenerateCoverLetterFormProps) {
  const [
    { response, error, cv, jobDesc, lang: generateLang, role, company },
    formAction,
    pending,
  ] = useActionState(generateCoverLetterAction, initialState);
  const { title, desc } = getJobDescDictionary(lang);
  const { cvDesc, cvLabel } = getScoringFormDictionary(lang);

  return (
    <>
      <form id="generate-cover-letter-form" action={formAction} method="POST">
        <CsrfInput />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <CardInputContainer title={cvLabel} desc={cvDesc}>
              <Suspense fallback={<DefaultLoader />}>
                <CvForm defaultValue={cv} lang={lang} />
              </Suspense>
            </CardInputContainer>
            <CompanyDetailForm company={company} role={role} lang={lang} />
          </div>
          <CardInputContainer title={title} desc={desc}>
            <JobDescForm
              defaultValue={jobDesc}
              lang={lang}
              className="h-[520px]"
            />
          </CardInputContainer>
          <div className="md:col-span-2 flex justify-center items-center">
            <InputLangBtn
              defaultValue={generateLang}
              name="lang"
              id="lang"
              required
              aria-required
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <GenerateBtn
            disabled={pending}
            size="lg"
            lang={lang}
            feature={PAYG_PAYMENT.COVER_LETTER_GENERATE}
            className="rounded-full px-8 gap-2 w-1/2"
          >
            Submit
          </GenerateBtn>
        </div>
        {error && (
          <div className="flex justify-center items-center">
            <p className="text-red-500 text-sm antialiased animate-pulse duration-1000">
              {error}
            </p>
          </div>
        )}
      </form>
      {!!response.length && (
        <ResponseCard lang={lang} responses={[response]} loading={pending} />
      )}
    </>
  );
}

export default memo(GenerateCoverLetterForm);
