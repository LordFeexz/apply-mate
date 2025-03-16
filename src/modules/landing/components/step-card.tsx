import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { memo } from "react";

export interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="relative p-6 rounded-lg bg-card border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="absolute -top-5 left-6 bg-primary text-primary-foreground text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center">
        {number}
      </CardHeader>
      <CardContent className="pt-6">
        <hgroup className="antialiased" id={title}>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </hgroup>
      </CardContent>
    </Card>
  );
}

export default memo(StepCard);
