"use client";

import { PostsDataType } from "@/data/postData";
import { useState } from "react";
import Post from "./Post";

export default function PostContainer({
  serverPosts,
}: {
  serverPosts: PostsDataType;
}) {
  const [posts, setPosts] = useState(serverPosts.results);
  const [next, setNext] = useState(serverPosts.next);
  const [previous, setPrevious] = useState(serverPosts.previous);
  const numberPosts = serverPosts.count;

  async function handleNext() {
    const url = setDomainName(next);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data: PostsDataType = await res.json();
    if (data) {
      setPosts(data.results);
      setNext(data.next);
    }
  }

  return (
    <>
      <button onClick={handleNext}>Next</button>
      <ul className="flex flex-col">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </ul>
    </>
  );
}

export function setDomainName(url: string): string {
  if (url.includes("nginx")) {
    return url.replace("nginx", "localhost:8080");
  } else {
    return url.replace("localhost", "localhost:8080");
  }
}
