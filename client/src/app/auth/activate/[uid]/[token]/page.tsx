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
    <div className="text-3xl font-medium">
      {res.ok ? "User Activated" : "User is already Activated"}
    </div>
  );
}
