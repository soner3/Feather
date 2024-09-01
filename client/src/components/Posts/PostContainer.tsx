"use client";

import { PostsDataType, PostType } from "@/data/postData";
import { useState } from "react";
import Post from "./Post";
import PostPagination from "./PostPagination";

export default function PostContainer({
  serverPosts,
}: {
  serverPosts: PostsDataType;
}) {
  const [posts, setPosts] = useState(serverPosts.results);
  const [next, setNext] = useState<string | null>(serverPosts.next);
  const [previous, setPrevious] = useState<string | null>(serverPosts.previous);
  const [activeValue, setActiveValue] = useState(1);
  const [numberPosts, setNumberPosts] = useState(serverPosts.count);

  function handleSetPosts(postData: PostType[]) {
    setPosts(postData);
  }

  function handleSetNext(nextFetch: string | null) {
    setNext(nextFetch);
  }

  function handleSetPrevious(previousFetch: string | null) {
    setPrevious(previousFetch);
  }

  function handleSetActiveValue(newValue: number) {
    setActiveValue(newValue);
  }

  function handleSetNumberPosts(newValue: number) {
    setNumberPosts(newValue);
  }

  return (
    <>
      <PostPagination
        count={Math.ceil(numberPosts / 5)}
        activeValue={activeValue}
        next={next}
        previous={previous}
        handleSetActiveValue={handleSetActiveValue}
        handleSetNext={handleSetNext}
        handleSetNumberPosts={handleSetNumberPosts}
        handleSetPosts={handleSetPosts}
        handleSetPrevious={handleSetPrevious}
      />
      <ul className="flex flex-col">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </ul>
    </>
  );
}
