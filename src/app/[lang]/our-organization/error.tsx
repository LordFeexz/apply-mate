"use client";

import type { ErrorProps } from "@/interfaces/component";
import OurOrganizationError from "@/modules/our-organization/error";

export default function Error(props: ErrorProps) {
  return <OurOrganizationError {...props} />;
}
