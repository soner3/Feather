"use client";

import { useGetPostsQuery } from "@/lib/features/api/apiSlice";
import Post from "./Post";
import { useState } from "react";
import PostPagination from "./PostPagination";

export default function PostListContainer() {
  const [page, setPage] = useState(1);
  const {
    data: postsData,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostsQuery(page);

  function handleNextPage(next: null | string) {
    if (next) {
      setPage((page) => page + 1);
    }
  }

  function handlePreviousPage(previous: null | string) {
    if (previous) {
      setPage((page) => page - 1);
    }
  }

  return (
    <>
      {isLoading && "Loading..."}
      {isError && "An Error Occurred Please Try Again"}
      {isSuccess && (
        <>
          <PostPagination
            page={page}
            nextPage={handleNextPage}
            previousPage={handlePreviousPage}
            next={postsData.next}
            previous={postsData.previous}
          />
          <ul className="flex flex-col gap-3">
            {postsData.results.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
          </ul>
        </>
      )}
    </>
  );
}
