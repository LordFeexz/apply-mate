import BackBtn from "@/components/common/back-btn";
import { FileQuestion } from "lucide-react";
import { memo } from "react";

function HistoryDetailNotFound() {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <FileQuestion className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">History Item Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The generation history item you're looking for doesn't exist or may
          have been deleted.
        </p>
        <BackBtn />
      </div>
    </section>
  );
}

export default memo(HistoryDetailNotFound);
