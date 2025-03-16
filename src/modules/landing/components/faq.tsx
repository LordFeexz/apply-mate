import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import { FAQ_CARD_EN, FAQ_CARD_ID } from "../constant";

export interface FaqProps extends LangProps {}

function Faq({ lang }: FaqProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {(lang === LANG.ID ? FAQ_CARD_ID : FAQ_CARD_EN).map(
        ({ question, answer }) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger className="text-left font-semibold">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}

export default memo(Faq);
