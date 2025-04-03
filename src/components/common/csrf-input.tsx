"use client";

import useCSRF from "@/hooks/use-csrf";
import { memo } from "react";

function CSRFInput() {
  const csrf = useCSRF();

  return (
    <input
      type="hidden"
      readOnly
      aria-readonly
      name="csrf"
      value={csrf}
      aria-hidden
      aria-label="csrf"
    />
  );
}

export default memo(CSRFInput);
