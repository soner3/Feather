import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href={"/auth/login/"}>Login</Link>
      <Link href={"/auth/register/"}>Register</Link>
    </>
  );
}
