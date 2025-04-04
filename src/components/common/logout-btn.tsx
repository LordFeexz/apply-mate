"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { memo, useCallback, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import useSharedStore from "@/modules/shared/store";
import { useRouter } from "next/navigation";

function LogoutBtn() {
  const { status, data } = useSession();
  const { setData, data: profile } = useSharedStore();
  const router = useRouter();
  const onClickHandler = useCallback(async () => {
    if (status !== "authenticated") return;

    await signOut();
    setData(null);
    toast.success("Logout successfully");
    router.refresh();
  }, [signOut, status, setData, router]);

  useEffect(() => {
    if (status === "unauthenticated" && data) {
      signOut();
      setData(null);
      router.refresh();
    }
  }, [status, signOut, setData, data, router]);

  if (!profile) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer"
      onClick={onClickHandler}
      aria-label="Logout"
      id="logout-btn"
      aria-describedby="logout"
      title="Logout"
      disabled={!profile}
      aria-disabled={!profile}
    >
      <LogOut className="w-5 h-5" />
      <span className="sr-only" id="logout">
        Logout Button
      </span>
    </Button>
  );
}

export default memo(LogoutBtn);
