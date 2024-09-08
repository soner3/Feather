import Link from "next/link";
import logo from "../../public/android-chrome-512x512.png";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <section className="flex items-center justify-center gap-5">
        <Image src={logo} alt="Logo" width={180} />
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-6xl font-medium capitalize">
            welcome to feather
          </h1>
          <p className="text-3xl capitalize">
            your online forum for chatting and networking
          </p>
          <div className="flex items-center justify-center gap-5 text-xl">
            <Link
              href={"/auth/login/"}
              className="mx-auto w-full rounded-lg bg-green-500 py-2 text-white duration-200 hover:scale-105 hover:bg-green-600 active:scale-90 active:bg-green-700"
            >
              Login
            </Link>
            <Link
              href={"/auth/register/"}
              className="mx-auto w-full rounded-lg bg-green-500 py-2 text-white duration-200 hover:scale-105 hover:bg-green-600 active:scale-90 active:bg-green-700"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
