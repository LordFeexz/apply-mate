import Image, { type ImageProps } from "next/image";
import { memo } from "react";

export interface PriorityImgProps extends Omit<ImageProps, "priority"> {
  wrapperClassName?: string;
}

function PriorityImg({ wrapperClassName, ...rest }: PriorityImgProps) {
  return (
    <figure className={wrapperClassName}>
      <Image {...rest} priority />
    </figure>
  );
}

export default memo(PriorityImg);
