import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PropTypes {
  icon: ReactNode;
  title: string;
}

export default function SidebarLogoutButton({ icon, title }: PropTypes) {
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
    <motion.li
      className="flex h-full cursor-pointer items-center gap-4 rounded-lg px-2 py-4 shadow active:shadow-green-500 dark:shadow-green-500"
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
  );
}
