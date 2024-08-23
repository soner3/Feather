"use client";

import { HiMiniBars4 } from "react-icons/hi2";
import { HiOutlineXMark } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { changeSidebar } from "@/lib/features/sidebar/sidebarSlice";

export default function SidebarButton() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((store) => store.sidebar.isOpen);

  const icon = isOpen ? (
    <HiOutlineXMark className="size-7" />
  ) : (
    <HiMiniBars4 className="size-7" />
  );

  return (
    <>
      <motion.button
        onClick={() => dispatch(changeSidebar(!isOpen))}
        className="z-10 rounded-full border-2 border-green-500 p-2 shadow shadow-green-500"
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: "360deg",
        }}
        whileTap={{
          scale: 0,
          rotate: "-180deg",
        }}
        whileHover={{
          scale: 1.2,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {icon}
      </motion.button>
    </>
  );
}
