"use client";

import { ReactNode } from "react";
import { HiHome, HiUserPlus, HiUserCircle, HiUserMinus } from "react-icons/hi2";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";
import SidebarFooter from "./SidebarFooter";
import SidebarLogoutButton from "./SidebarLogoutButton";
import { useAppSelector } from "@/lib/reduxHooks";

export interface sidebarListItemType {
  id: string;
  icon: ReactNode;
  title: string;
  href: string;
}

export interface sidebarLogoutButtonItemType {
  id: string;
  icon: ReactNode;
  title: string;
}

const sidebarItems: sidebarListItemType[] = [
  {
    id: "1",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
    href: "/",
  },
  {
    id: "2",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
    href: "/",
  },
  {
    id: "3",
    icon: <HiHome className="size-6" />,
    title: "Homepage",
    href: "/",
  },
];

const sidebarFooterLoggedOut: sidebarListItemType[] = [
  {
    id: "1",
    icon: <HiUserCircle className="size-6" />,
    title: "Login",
    href: "/auth/login",
  },
  {
    id: "2",
    icon: <HiUserPlus className="size-6" />,
    title: "Register",
    href: "/auth/register",
  },
];

const sidebarFooterLoggedIn: sidebarLogoutButtonItemType[] = [
  {
    id: "3",
    icon: <HiUserMinus className="size-6" />,
    title: "Logout",
  },
];

export default function SidebarItemList() {
  const isOpen = useAppSelector((store) => store.sidebar.isOpen);
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

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
    <div className="flex h-full flex-col">
      <motion.ul
        className="mt-20 flex flex-col gap-3"
        variants={itemListVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
      >
        {sidebarItems.map((item) => {
          return (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              href={item.href}
            />
          );
        })}
      </motion.ul>
      <motion.ul
        className="mt-auto flex flex-col gap-3"
        variants={itemListVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
      >
        {isAuthenticated
          ? sidebarFooterLoggedIn.map((item) => {
              return (
                <SidebarLogoutButton
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                />
              );
            })
          : sidebarFooterLoggedOut.map((item) => {
              return (
                <SidebarFooter
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  href={item.href}
                />
              );
            })}
      </motion.ul>
    </div>
  );
}
