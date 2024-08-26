"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SidebarItemList from "./SidebarItemList";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { changeSidebar } from "@/lib/features/sidebar/sidebarSlice";

export default function Sidebar() {
  const isOpen = useAppSelector((store) => store.sidebar.isOpen);
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(changeSidebar(false));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

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
      ref={sidebarRef}
      className="fixed left-0 top-0 rounded-r-2xl bg-white p-6 shadow shadow-green-500 dark:bg-slate-900"
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      {isOpen && <SidebarItemList />}
    </motion.nav>
  );
}
