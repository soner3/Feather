"use client";

import React from "react";
import { motion } from "framer-motion";
import SidebarItemList from "./SidebarItemList";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { changeSidebar } from "@/lib/features/sidebar/sidebarSlice";

export default function Sidebar() {
  const isOpen = useAppSelector((store) => store.sidebar.isOpen);
  const dispatch = useAppDispatch();

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
      onMouseLeave={() => dispatch(changeSidebar(false))}
    >
      {isOpen && <SidebarItemList />}
    </motion.nav>
  );
}
