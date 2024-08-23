"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/lib/reduxHooks";
import { logout } from "@/data/authData";
import { setLogout } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";

interface PropTypes {
  icon: ReactNode;
  title: string;
}

export default function SidebarLogoutButton({ icon, title }: PropTypes) {
  const dispatch = useAppDispatch();

  const variants = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  };

  async function handleLogout() {
    const res = await logout();

    if (res.ok) {
      localStorage.removeItem("username");
      dispatch(setLogout());
      toast.success("Logout successfull");
    } else {
      toast.error("An error occured during logout");
    }
  }

  return (
    <Link href={"/auth/login/"} replace>
      <motion.li
        className="flex h-full cursor-pointer items-center gap-4 rounded-lg px-2 py-4 shadow active:shadow-green-500 dark:shadow-green-500"
        onClick={handleLogout}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.2,
        }}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </motion.li>
    </Link>
  );
}
