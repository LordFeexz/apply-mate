"use client";

import Markdown from "@/components/common/markdown";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export interface ResponseCardProps {
  loading: boolean;
  responses: string[];
}

function ResponseCard({ loading, responses }: ResponseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [ref]);

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
            <span>Analyzing your CV and job description...</span>
          </div>
        </div>
      )}

      <div className={cn("space-x-4", loading && "opacity-50")}>
        <Markdown content={responses.join("\n")} />
      </div>
    </motion.div>
  );
}

export default memo(ResponseCard);
