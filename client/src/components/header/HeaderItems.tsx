import SidebarButton from "./SidebarButton";
import Logo from "../Logo";
import ThemeButtons from "./ThemeButtons";
import Sidebar from "./Sidebar";

export default function HeaderItems() {
  return (
    <>
      <div className="flex items-center gap-5">
        <Sidebar />
        <SidebarButton />
        <Logo />
      </div>
      <div className="flex items-center gap-5">
        <ThemeButtons />
      </div>
    </>
  );
}
