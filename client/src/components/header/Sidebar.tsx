"use client";

import { motion } from "framer-motion";
import SidebarItemList from "./SidebarItemList";
import { useAppSelector } from "@/lib/reduxHooks";

export default function Sidebar() {
  const isOpen = useAppSelector((store) => store.sidebar.isOpen);

  const sidebarVariants = {
    closed: {
      width: 0,
      height: 0,
      scale: 0,
    },
    open: {
      width: "320px",
      height: "100%",
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.nav
      className="fixed left-0 top-0 rounded-r-2xl bg-white p-6 shadow shadow-green-500 dark:bg-slate-900"
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {isOpen && <SidebarItemList />}
    </motion.nav>
  );
}
