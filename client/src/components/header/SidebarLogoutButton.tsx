"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/lib/reduxHooks";
import { setLogout } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import { useDeleteTokenMutation } from "@/lib/features/api/apiSlice";

interface PropTypes {
  icon: ReactNode;
  title: string;
}

export default function SidebarLogoutButton({ icon, title }: PropTypes) {
  const dispatch = useAppDispatch();
  const [deleteToken, { isLoading, isSuccess }] = useDeleteTokenMutation();

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
    toast.dismiss();
    try {
      await deleteToken().unwrap();

      dispatch(setLogout());
      localStorage.removeItem("username");
      toast.info("Logout successfull");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occured during logout" + error.message);
      }
    }
  }

  return (
    <Link href={"/auth/login/"}>
      <motion.button
        className="flex h-full w-full cursor-pointer items-center gap-4 rounded-lg px-2 py-4 shadow active:shadow-green-500 dark:shadow-green-500"
        onClick={handleLogout}
        disabled={isLoading}
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.2,
        }}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </motion.button>
    </Link>
  );
}
