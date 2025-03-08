import { Card, CardContent } from "@/components/ui/card";
import type { ChildrenProps } from "@/interfaces/component";
import { memo } from "react";

export interface CardInputContainerProps extends ChildrenProps {
  title: string;
  desc: string;
}

function CardInputContainer({
  title,
  desc,
  children,
}: CardInputContainerProps) {
  return (
    <Card className="overflow-hidden border-2 card-hover hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <hgroup className="p-4 bg-secondary/50 border-b rounded-b-md">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </hgroup>
        {children}
      </CardContent>
    </Card>
  );
}

export default memo(CardInputContainer);
