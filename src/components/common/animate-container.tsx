"use client";

import type { ChildrenProps } from "@/interfaces/component";
import { memo, type ComponentProps } from "react";
import { motion } from "framer-motion";

export interface AnimateContainerProps
  extends ChildrenProps,
    Omit<ComponentProps<"div">, "children"> {}

function AnimateContainer({
  className,
  children,
  ...rest
}: AnimateContainerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimateContainer);
