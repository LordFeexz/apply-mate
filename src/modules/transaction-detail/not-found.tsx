import BackBtn from "@/components/common/back-btn";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import { memo } from "react";

function TransactionDetailNotFound() {
  return (
    <Card className="w-full">
      <CardContent className="py-10">
        <div className="text-center">
          <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Transaction Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The transaction you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <BackBtn />
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(TransactionDetailNotFound);
