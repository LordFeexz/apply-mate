"use client";

import type { ChildrenProps } from "@/interfaces/component";
import { memo } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface AnimateContainerProps
  extends ChildrenProps,
    Omit<
      HTMLMotionProps<"div">,
      "children" | "initial" | "animate" | "transition"
    > {}

function AnimateContainer({
  className,
  children,
  ...rest
}: AnimateContainerProps) {
  return (
    <motion.div
      {...rest}
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
