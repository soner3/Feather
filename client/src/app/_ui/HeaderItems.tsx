"use client";

import { Provider } from "react-redux";
import { store } from "../_lib/store";
import SidebarButton from "./SidebarButton";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import { ReactNode } from "react";
import AvatarMenu from "../_components/AvatarMenu";
import ThemeButtons from "../_components/ThemeButtons";

export default function HeaderItems() {
  return (
    <Provider store={store}>
      <div className="flex items-center gap-5">
        <Sidebar />
        <SidebarButton />
        <Logo />
      </div>
      <div className="flex items-center gap-5">
        <ThemeButtons />
        <AvatarMenu />
      </div>
    </Provider>
  );
}
