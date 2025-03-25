import { getCSRF } from "@/modules/shared/action";
import { useEffect, useState } from "react";

export default function useCSRF() {
  const [csrf, setCsrf] = useState<string>("");
  useEffect(() => {
    getCSRF().then((res) => setCsrf(res));
  }, []);

  return csrf;
}
