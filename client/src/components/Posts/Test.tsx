"use client";

import { useGetPostsQuery } from "@/lib/features/api/apiSlice";

export default function Test() {
  const { data: postList, isSuccess } = useGetPostsQuery();
  return <div>Posts: {postList?.count}</div>;
}
