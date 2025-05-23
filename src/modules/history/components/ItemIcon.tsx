import { FEATURE } from "@/enums/global";
import { FileCheck, FileText, SlidersHorizontal } from "lucide-react";
import { memo } from "react";

export interface ItemIconProps {
  feature: FEATURE;
}

function ItemIcon({ feature }: ItemIconProps) {
  switch (feature) {
    case FEATURE.GENERATE_OPTIMIZE_CV:
      return <FileText className="h-5 w-5 text-blue-500" />;
    case FEATURE.GENERATE_COVER_LETTER:
      return <FileCheck className="h-5 w-5 text-green-500" />;
    case FEATURE.SCORING_CV:
      return <SlidersHorizontal className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
}

export default memo(ItemIcon);
