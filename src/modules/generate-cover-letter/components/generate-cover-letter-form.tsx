"use client";

import DefaultLoader from "@/components/common/default-loader";
import type { LangProps } from "@/interfaces/component";
import { getScoringFormDictionary } from "@/modules/scoring-cv/i18n";
import CardInputContainer from "@/modules/shared/components/card-input-container";
import CvForm from "@/modules/shared/components/cv-form";
import JobDescForm from "@/modules/shared/components/job-desc-form";
import { getJobDescDictionary } from "@/modules/shared/i18n";
import {
  memo,
  Suspense,
  useCallback,
  useRef,
  useState,
  useTransition,
  type FormEventHandler,
} from "react";
import CompanyDetailForm from "./company-detail-form";
import InputLangBtn from "@/components/common/input-lang-btn";
import { sanitizeString } from "@/libs/utils";
import dynamic from "next/dynamic";
import GenerateBtn from "@/modules/shared/components/generate-btn";
import { PAYG_PAYMENT } from "@/enums/global";
import CsrfInput from "@/components/common/csrf-input";
const ResponseCard = dynamic(() => import("./response-card"), { ssr: false });

export interface GenerateCoverLetterFormProps extends LangProps {}

function GenerateCoverLetterForm({ lang }: GenerateCoverLetterFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const { title, desc } = getJobDescDictionary(lang);
  const { cvDesc, cvLabel } = getScoringFormDictionary(lang);
  const [responses, setResponses] = useState<string[]>([]);

  const onSubmitHandler: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      startTransition(async () => {
        if (!ref.current) return;

        const formData = new FormData(ref.current);
        const response = await fetch("/api/cover-letter", {
          method: "POST",
          body: formData,
        });

        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              setResponses((prev) => [...prev, sanitizeString(chunk)]);
            }
          }
        }
      });
    },
    [ref, setResponses]
  );

  return (
    <>
      <form
        ref={ref}
        id="generate-cover-letter-form"
        onSubmit={onSubmitHandler}
      >
        <CsrfInput />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <CardInputContainer title={cvLabel} desc={cvDesc}>
              <Suspense fallback={<DefaultLoader />}>
                <CvForm lang={lang} />
              </Suspense>
            </CardInputContainer>
            <CompanyDetailForm lang={lang} />
          </div>
          <CardInputContainer title={title} desc={desc}>
            <JobDescForm lang={lang} className="h-[520px]" />
          </CardInputContainer>
          <div className="md:col-span-2 flex justify-center items-center">
            <InputLangBtn name="lang" id="lang" required aria-required />
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
      </form>
      {!!responses.length && (
        <ResponseCard lang={lang} responses={responses} loading={pending} />
      )}
    </>
  );
}

export default memo(GenerateCoverLetterForm);
