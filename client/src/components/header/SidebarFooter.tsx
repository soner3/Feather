"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PropTypes {
  icon: ReactNode;
  title: string;
  href: string;
}

export default function SidebarFooter({ icon, title, href }: PropTypes) {
  const path = usePathname();

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
    <Link href={href} prefetch replace>
      <motion.li
        className={`flex h-full cursor-pointer items-center gap-4 rounded-lg px-2 py-4 shadow shadow-green-500 ${path === href ? "shadow-md" : ""}`}
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
