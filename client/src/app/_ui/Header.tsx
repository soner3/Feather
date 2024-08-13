import AvatarMenu from "../_components/AvatarMenu";
import HeaderItems from "./HeaderItems";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between p-4 shadow-xl">
      <HeaderItems />
    </header>
  );
}
