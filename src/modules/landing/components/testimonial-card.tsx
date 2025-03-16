import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  //todo edit testimonial to be real data
  return (
    <Card className="border-2 transition-all duration-300 hover:shadow-md hover:scale-105 shadow cursor-pointer">
      <CardContent className="pt-6">
        <p className="mb-6 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <hgroup className="antialiased">
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </hgroup>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(TestimonialCard);
