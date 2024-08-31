"use client";

import { rotateToken } from "@/data/authData";
import { setLogin, setLogout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientAuth() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();

  // Only for Developement
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      dispatch(setLogin(username));
    } else {
      dispatch(setLogout());
      if (path.startsWith("/feather")) {
        router.replace("/auth/login/");
      }
    }

    async function rotateAllToken() {
      const res = await rotateToken();

      if (res && res.ok) {
        if (path === "/") {
          router.replace("/feather/posts/");
        }
      }

      if (!res) {
        dispatch(setLogout());
        if (path.startsWith("/feather")) {
          router.replace("/auth/login/");
        }
        return;
      }

      if (!res.ok) {
        dispatch(setLogout());
        if (path.startsWith("/feather")) {
          router.replace("/auth/login/");
        }
      }
    }

    if (!isRotating) {
      setIsRotating(true);
      rotateAllToken();
      setIsRotating(false);
    }
    setIsRotating(true);

    const interval = setInterval(
      () => {
        rotateAllToken();
      },
      1000 * 60 * 10,
    );

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, isRotating, path, router]);

  return null;
}
