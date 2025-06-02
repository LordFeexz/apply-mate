import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";
import InputRenderer from "./input-renderer";

export interface InputTabProps {
  data: Record<string, any>;
}

function InputTab({ data }: InputTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <InputRenderer data={data} />
      </CardContent>
    </Card>
  );
}

export default memo(InputTab);
