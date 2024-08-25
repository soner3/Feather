import Link from "next/link";

export default async function page({
  params,
}: {
  params: {
    uid: string;
    token: string;
  };
}) {
  const { uid, token } = params;
  const res = await fetch("http://nginx/users/activation/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, token }),
  });

  return (
    <section className="flex flex-1 items-center justify-center text-3xl font-medium">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-center gap-3 rounded-lg bg-green-500 p-4 text-white shadow-2xl shadow-black">
        <h2 className="">
          {res.ok
            ? "User Activated"
            : res.status === 403
              ? "User Has Already Been Activated"
              : "The Given Credentials Are Not Valid"}
        </h2>
        <Link href={"/auth/login/"}>
          <button className="my-3 w-full rounded-lg bg-green-800 p-2 duration-300 hover:scale-105 active:scale-90 active:bg-green-900">
            <p className="px-12">Login</p>
          </button>
        </Link>
      </div>
    </section>
  );
}
