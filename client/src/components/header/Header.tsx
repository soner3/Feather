import HeaderItems from "./HeaderItems";

export default function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between p-4 shadow-2xl">
      <HeaderItems />
    </header>
  );
}
