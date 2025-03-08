import { useEffect, type RefObject } from "react";
import { useDebounce } from "use-debounce";
import useMount from "./use-mount";

export default function useFormState(ref: RefObject<HTMLFormElement | null>) {
  const mount = useMount();
  const [updateParams] = useDebounce((params: string) => {
    if (!mount) return;
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = params;

      window.history.replaceState({}, "", url.toString());
    }
  }, 500);

  useEffect(() => {
    if (!ref.current) return;

    const updater = (e: FocusEvent) => {
      if (!ref.current) return;
      const target = e.target as HTMLInputElement;
      if (target?.type === "file") return;

      const formData = new FormData(ref.current);

      const formState: Record<string, string> = Array.from(formData.entries())
        .filter(([key, value]) => {
          const inputElement = ref.current?.elements.namedItem(
            key
          ) as HTMLInputElement;
          return (
            inputElement?.type !== "file" &&
            typeof value === "string" &&
            value !== ""
          );
        })
        .reduce((acc, [key, value]) => {
          acc[key] = value as string;
          return acc;
        }, {} as Record<string, string>);

      const searchParams = new URLSearchParams(formState);
      const params = searchParams.toString();
      updateParams(params);
    };

    ref.current.addEventListener("focusout", updater);
    return () => {
      if (ref.current) ref.current.removeEventListener("focusout", updater);
    };
  }, [updateParams, mount]);
}
