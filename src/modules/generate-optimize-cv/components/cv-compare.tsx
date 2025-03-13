"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Compare from "@/components/ui/compare";
import type { LangProps } from "@/interfaces/component";
import { markdownToText } from "@/libs/utils";
import { motion } from "framer-motion";
import { memo, useState } from "react";

export interface CvCompareProps extends LangProps {
  originalCv: string;
  generatedCv: string;
}

function CvCompare({ lang, originalCv, generatedCv }: CvCompareProps) {
  const [sliderXPercent, setSliderXPercent] = useState(0);
  return (
    <Card className="border-2 mt-8 overflow-scroll shadow-lg h-fit w-full hover:scale-102 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-primary/10 border-b pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {"title"}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-fit">
        <Compare
          className="w-full h-fit"
          onSliderChange={setSliderXPercent}
          initialSliderPercentage={sliderXPercent}
          firstItem={
            <motion.div
              className="absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden bg-background p-4"
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <h3 className="text-lg font-semibold mb-2">Original CV</h3>
              <div className="whitespace-pre-wrap">{originalCv}</div>
            </motion.div>
          }
          secondItem={
            <motion.div className="absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none bg-background p-4">
              <h3 className="text-lg font-semibold mb-2">Generated CV</h3>
              <div className="whitespace-pre-wrap">
                {markdownToText(generatedCv)}
              </div>
            </motion.div>
          }
        />
      </CardContent>
    </Card>
  );
}

export default memo(CvCompare);
