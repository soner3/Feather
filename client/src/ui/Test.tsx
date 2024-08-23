"use client";

import { useAppSelector } from "@/lib/reduxHooks";

export default function Test() {
  const username = useAppSelector((store) => store.auth.username);
  return <div>{username}</div>;
}
