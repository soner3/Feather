"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../_lib/hooks/reduxHooks";
import SidebarItemList from "./SidebarItemList";

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
      className="fixed left-0 top-0 rounded-r-2xl bg-white p-6 shadow-2xl shadow-green-500 dark:bg-slate-900"
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {isOpen && <SidebarItemList />}
    </motion.nav>
  );
}
