import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { memo, type ReactNode } from "react";

export interface FeatureCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <Card
      as="article"
      className="border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <CardHeader>
        <div className="mb-4 p-2 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>{" "}
      <CardContent>
        <CardDescription className="text-base">{desc}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default memo(FeatureCard);
