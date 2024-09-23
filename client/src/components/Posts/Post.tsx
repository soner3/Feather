"use client";

import { PostType } from "@/lib/interfaces";

export default function Post({ post }: { post: PostType }) {
  return (
    <li className="flex w-full flex-col gap-3 rounded-lg p-3 shadow-md shadow-green-500">
      <p className="text-xl font-semibold">{post.profile.user.username}</p>
      {post.message}
    </li>
  );
}
