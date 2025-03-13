"use client";

import Markdown from "@/components/common/markdown";
import { cn, markdownToText } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import CopyBtn from "@/components/common/copy-btn";
import type { LangProps } from "@/interfaces/component";
import { getResponseCardDictionary } from "../i18n";

export interface ResponseCardProps extends LangProps {
  loading: boolean;
  responses: string[];
}

function ResponseCard({ loading, responses, lang }: ResponseCardProps) {
  const { load } = getResponseCardDictionary(lang);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [ref]);

  const response = useMemo(() => responses.join("\n"), [responses]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={ref}
      className={cn(
        "p-6 border-2 overflow-hidden max-w-2xl mx-auto rounded-xl",
        "hover:scale-102 shadow hover:shadow-lg transition-all duration-300",
        loading && "cursor-wait"
      )}
    >
      {loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>{load}</span>
          </div>
        </div>
      )}

      <div className={cn("space-x-4", loading && "opacity-50")}>
        <div className="flex justify-end items-center">
          <CopyBtn
            textToCopy={markdownToText(response)}
            lang={lang}
            disabled={loading}
            className="min-w-48"
          />
        </div>
        <Markdown content={response} />
      </div>
    </motion.div>
  );
}

export default memo(ResponseCard);
