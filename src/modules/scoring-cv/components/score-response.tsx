"use client";

import type { LangProps } from "@/interfaces/component";
import { motion } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import MatchScoreCard from "./match-score-card";
import ExplanationCard from "./explanation-card";
import MatchKeywordCard from "../../shared/components/match-keyword-card";
import MissingKeywordCard from "./missing-keyword-card";

export interface ScoreResponseProps extends LangProps {
  score: number;
  keywordMatches: string[];
  missingKeywords: string[];
  explanation: string;
}

function ScoreResponse({
  score,
  lang,
  keywordMatches,
  missingKeywords,
  explanation,
}: ScoreResponseProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [ref]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      id="score-response"
    >
      <MatchScoreCard lang={lang} score={score} />

      <div className="grid gap-6 md:grid-cols-2">
        <ExplanationCard lang={lang} explanation={explanation} />

        <MatchKeywordCard lang={lang} keywords={keywordMatches} />

        <MissingKeywordCard lang={lang} missingKeywords={missingKeywords} />
      </div>
    </motion.section>
  );
}

export default memo(ScoreResponse);
