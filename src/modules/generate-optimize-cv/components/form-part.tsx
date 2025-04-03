import { memo, Suspense } from "react";
import CardInputContainer from "@/modules/shared/components/card-input-container";
import DefaultLoader from "@/components/common/default-loader";
import CvForm from "@/modules/shared/components/cv-form";
import JobDescForm from "@/modules/shared/components/job-desc-form";
import type { LangProps } from "@/interfaces/component";
import { getJobDescDictionary, getScoringFormDictionary } from "../i18n";
import type { IScoringSchema } from "@/modules/shared/schema";
import GenerateBtn from "@/modules/shared/components/generate-btn";
import { PAYG_PAYMENT } from "@/enums/global";
import CsrfInput from "@/components/common/csrf-input";

export interface FormPartProps extends LangProps, Omit<IScoringSchema, "lang"> {
  loading: boolean;
}

function FormPart({ lang, cv, jobDesc, loading }: FormPartProps) {
  const { cvDesc, cvLabel } = getScoringFormDictionary(lang);
  const { title, desc } = getJobDescDictionary(lang);

  return (
    <>
      <input
        type="hidden"
        className="sr-only"
        name="lang"
        value={lang}
        readOnly
        aria-readonly
      />
      <CsrfInput />
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
      </div>
      <div className="flex justify-center">
        <GenerateBtn
          disabled={loading}
          size="lg"
          lang={lang}
          feature={PAYG_PAYMENT.CV_GENERATE}
          className="rounded-full px-8 gap-2 w-1/2"
        >
          Submit
        </GenerateBtn>
      </div>
    </>
  );
}

export default memo(FormPart);
