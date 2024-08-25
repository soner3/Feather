import HeaderItems from "./HeaderItems";

export default function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between bg-white p-4 text-green-500 shadow-2xl dark:bg-slate-900">
      <HeaderItems />
    </header>
  );
}
