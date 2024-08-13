import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppSelector } from "../_lib/hooks/reduxHooks";

interface PropTypes {
  icon: ReactNode;
  title: string;
}

export default function SidebarItem({ icon, title }: PropTypes) {
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

  return (
    <Link href={"/"}>
      <motion.li
        className="flex cursor-pointer items-center gap-4 rounded-lg px-2 py-4 shadow active:shadow-sky-500 dark:shadow-white"
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
