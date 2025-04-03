"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { memo, useCallback, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

function LogoutBtn() {
  const { status } = useSession();
  const onClickHandler = useCallback(async () => {
    if (status !== "authenticated") return;

    await signOut();
    toast.success("Logout successfully");
  }, [signOut, status]);

  useEffect(() => {
    if (status === "unauthenticated") signOut();
  }, [status, signOut]);

  if (status !== "authenticated") return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer"
      onClick={onClickHandler}
      aria-label="Logout"
      id="logout-btn"
    >
      <LogOut className="w-5 h-5" />
      <span className="sr-only" id="logout">
        Logout Button
      </span>
    </Button>
  );
}

export default memo(LogoutBtn);
