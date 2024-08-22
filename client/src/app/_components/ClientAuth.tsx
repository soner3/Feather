"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { rotateToken } from "../_api/auth/authData";
import { useAppDispatch } from "../_lib/hooks/reduxHooks";
import { setAuth, setLogout } from "../_lib/features/authSlice";
import { applyTheme } from "../_lib/theme";

export default function ClientAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();

  useEffect(() => {
    async function rotateAllToken() {
      const rotateRes = await rotateToken();

      if (rotateRes) {
        if (!rotateRes.ok) {
          dispatch(setLogout());

          if (!path.startsWith("/auth/")) {
            router.replace("/auth/login/");
          }
        } else {
          dispatch(setAuth());
        }
      }
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

  return <>{children}</>;
}
