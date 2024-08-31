import { cookies } from "next/headers";

export interface PostsDataType {
  count: number;
  next: string;
  previous: string;
  results: Array<PostType>;
}

export interface PostType {
  id: string;
  message: string;
  profile: ProfileType;
}

interface ProfileType {
  user: UserType;
  profile_picture: string;
}

interface UserType {
  username: string;
}

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
