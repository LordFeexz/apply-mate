import { Loader2 } from "lucide-react";
import { memo } from "react";

function DefaultLoader() {
  return (
    <div className="flex justify-center items-start">
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
}

export default memo(DefaultLoader);
