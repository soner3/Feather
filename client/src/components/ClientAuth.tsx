"use client";

import { setLogin, setLogout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientAuth() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      dispatch(setLogout());
      if (path.startsWith("/feather")) {
        router.replace("/auth/login/");
      }
      return;
    }
    dispatch(setLogin(username));
  }, [dispatch, path, router]);

  return null;
}
