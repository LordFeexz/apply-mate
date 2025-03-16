import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/libs/utils";
import { CheckCircle } from "lucide-react";
import { memo } from "react";

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  popular?: boolean;
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "border-2 relative",
        "hover:border-primary hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-300"
      )}
    >
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge className="px-3 py-1 bg-primary text-primary-foreground">
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader className="text-center pb-4 min-h-32">
        <CardTitle>{title}</CardTitle>
        <div className="mt-4 mb-2">
          <span className="text-4xl font-bold">{price}</span>
          {period && (
            <span className="text-muted-foreground ml-1">{period}</span>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-0 flex flex-col h-full">
        <ul className="space-y-3 mb-6 flex-1 relative">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={buttonVariant}
          className="w-full cursor-pointer hover:scale-99 shadow-lg hover:shadow transition-all duration-300 mt-auto"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

export default memo(PricingCard);
