import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

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
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center shadow-xl">
        <div className="mb-2 flex h-96 w-1/2 flex-col gap-5 rounded-xl bg-green-500 text-center text-3xl font-bold text-white shadow-2xl">
          <div>
            <h1 className="mt-36">
              {res.ok
                ? "User Activated"
                : res.status === 403
                  ? "User Has Already Been Activated"
                  : "The Given Credentials Are Not Valid"}
            </h1>
          </div>
          {res.ok && (
            <Link href={"/auth/login/"}>
              <button className="mx-auto w-1/2 items-center rounded-lg bg-green-800 p-2 text-white duration-300 hover:scale-105 active:scale-90">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
