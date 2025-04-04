import { useEffect, useRef, type DependencyList } from "react";

export default function useRunOnce(func: () => void, deps?: DependencyList) {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      func();
    }
  }, deps);

  return ref.current;
}
