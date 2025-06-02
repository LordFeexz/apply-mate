import Markdown from "@/components/common/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";

export interface InputRendererProps {
  data: Record<string, string>;
}

function InputRenderer({ data }: InputRendererProps) {
  return (
    <div
      className="w-full grid md:grid-cols-2 gap-4"
      data-slot="input-renderer"
      id="input-renderer"
    >
      {Object.entries(data).map(([key, value]) => (
        <Card key={key} className="gap-2">
          <CardHeader>
            <CardTitle>{key}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Markdown content={value} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default memo(InputRenderer);
