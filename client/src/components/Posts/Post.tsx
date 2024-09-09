"use client";

import { PostType } from "@/lib/interfaces";
import Image from "next/image";

export default function Post({ post }: { post: PostType }) {
  return (
    <li className="flex w-full flex-col gap-3 rounded-lg p-3 shadow-md shadow-green-500">
      <div className="flex items-center gap-2">
        <Image
          src={post.profile.profile_picture}
          height={50}
          width={50}
          alt="Profile Picture"
          className="rounded-full border"
        />
        <p>{post.profile.user.username}</p>
      </div>
      {post.message}
    </li>
  );
}
