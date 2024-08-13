import { ReactNode, useEffect } from "react";
import { HiHome } from "react-icons/hi2";
import SidebarItem from "./SidebarItem";
import { motion, useAnimation } from "framer-motion";
import { useAppSelector } from "../_lib/hooks/reduxHooks";

export interface sidebarListItemType {
  id: string;
  icon: ReactNode;
  title: string;
}

const sidebarItems: sidebarListItemType[] = [
  {
    id: "1",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
  },
  {
    id: "2",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
  },
  {
    id: "3",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
  },
  {
    id: "4",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
  },
  {
    id: "5",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
  },
];

export default function SidebarItemList() {
  const isOpen = useAppSelector((store) => store.sidebar.isOpen);

  const itemListVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.5,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  return (
    <motion.ul
      className="mt-20 flex flex-col gap-3"
      variants={itemListVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="exit"
    >
      {sidebarItems.map((item) => {
        return (
          <SidebarItem key={item.id} icon={item.icon} title={item.title} />
        );
      })}
    </motion.ul>
  );
}
