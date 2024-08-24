"use client";

import { rotateToken } from "@/data/authData";
import { setLogin, setLogout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientAuth() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function rotateAllToken() {
      const res = await rotateToken();

      if (!res) {
        return;
      }

      if (res.ok) {
        const username = localStorage.getItem("username");
        if (username) {
          dispatch(setLogin(username));
        } else {
          dispatch(setLogout());
          if (!path.startsWith("/auth")) {
            router.replace("/auth/login/");
          }
        }
      } else {
        dispatch(setLogout());
        if (!path.startsWith("/auth")) {
          router.replace("/auth/login/");
        }
      }
    }

    rotateAllToken();

    const interval = setInterval(
      () => {
        rotateAllToken();
      },
      1000 * 60 * 10,
    );

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, path, router]);

  return null;
}
