import SidebarButton from "./SidebarButton";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import ThemeButtons from "../_components/ThemeButtons";

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
