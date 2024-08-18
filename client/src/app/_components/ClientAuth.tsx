"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { rotateToken } from "../_api/auth/authData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../_lib/hooks/reduxHooks";
import { setAuth, setLogout } from "../_lib/features/authSlice";
import Loader from "./Loader";
import { applyTheme } from "../_lib/theme";

let isRotating = false;

export default function ClientAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useAppSelector((store) => store.auth.isAuthenticated);
  const path = usePathname();

  useEffect(() => {
    async function rotateAllToken() {
      if (isRotating) {
        return;
      }

      isRotating = true;
      const rotateRes = await rotateToken();
      isRotating = false;

      if (!rotateRes.ok) {
        dispatch(setLogout());
        if (rotateRes.status === 401) {
          toast.info("Please login.");
        } else {
          toast.info("Your session time is expired, please login again.");
        }
        if (!path.startsWith("/auth/")) {
          router.push("/auth/login/");
        }
      } else {
        dispatch(setAuth());
      }

      setIsLoading(false);
    }

    applyTheme();
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
  }, [dispatch, router, path]);

  useEffect(() => {
    if (!isLoading && !isAuth && !path.startsWith("/auth/")) {
      router.push("/auth/login/");
    }
  }, [isLoading, isAuth, path, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuth && !path.startsWith("/auth/")) {
    return null;
  }

  return <>{children}</>;
}
