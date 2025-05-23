import { Badge } from "@/components/ui/badge";
import { FEATURE } from "@/enums/global";
import { memo } from "react";

export interface ItemBadgeProps {
  feature: FEATURE;
}

function ItemBadge({ feature }: ItemBadgeProps) {
  switch (feature) {
    case FEATURE.GENERATE_OPTIMIZE_CV:
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
        >
          CV
        </Badge>
      );
    case FEATURE.GENERATE_COVER_LETTER:
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
        >
          Cover Letter
        </Badge>
      );
    case FEATURE.SCORING_CV:
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
        >
          CV Score
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
        >
          Unknown
        </Badge>
      );
  }
}

export default memo(ItemBadge);
