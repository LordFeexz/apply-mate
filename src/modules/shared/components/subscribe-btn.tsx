"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { memo } from "react";

function SubscribeBtn() {
  return (
    <Button
      variant="outline"
      className="gap-2 cursor-pointer hover:scale-99 hover:opacity-90 hover:shadow transition-all duration-300"
    >
      <Zap className="h-4 w-4" />
      Get Unlimited
    </Button>
  );
}

export default memo(SubscribeBtn);
