import { PostsDataType } from "@/lib/interfaces";
import { cookies } from "next/headers";

export async function getPostList(): Promise<PostsDataType | null> {
  try {
    const token = cookies().get("feather_access")?.value;
    const res = await fetch("http://nginx/posts/list/", {
      headers: {
        cookie: `feather_access=${token}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    const data: PostsDataType = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
