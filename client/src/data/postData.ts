import { cookies } from "next/headers";

export async function getPostList() {
  const token = cookies().get("feather_access")?.value;
  const res = await fetch("http://nginx/posts/list/", {
    headers: {
      cookie: `feather_access=${token}`,
    },
  });
  const data = await res.json();
  return data;
}
