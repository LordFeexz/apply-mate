import { useEffect, useRef } from "react";

export default function useRunOnce(func: () => void) {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      func();
    }
  }, []);

  return ref.current;
}
