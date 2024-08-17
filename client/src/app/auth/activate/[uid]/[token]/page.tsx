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
        <div className="mb-2 h-96 w-1/2 rounded-xl bg-sky-500 text-center text-3xl font-bold text-white shadow-2xl">
          <h1 className="mt-44">
            {res.ok ? "User Activated" : "User is already Activated"}
          </h1>
        </div>
      </div>
    </div>
  );
}
