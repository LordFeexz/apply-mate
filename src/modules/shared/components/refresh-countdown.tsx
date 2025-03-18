"use client";

import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { memo, useEffect, useState } from "react";

export interface RefreshCountDownProps extends LangProps {}

function RefreshCountDown({ lang }: RefreshCountDownProps) {
  const [{ hours, minutes }, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-xs text-muted-foreground">
      {lang === LANG.ID
        ? `Diperbarui dalam ${hours}h ${minutes}m • 3 kredit gratis setiap hari`
        : `Refreshes in ${hours}h ${minutes}m • 3 free credits daily`}
    </p>
  );
}

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}

export default memo(RefreshCountDown);
