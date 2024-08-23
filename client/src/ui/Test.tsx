"use client";

import { useEffect, useState } from "react";

export default function Test() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");

    if (name) {
      setUsername(name);
    }
  }, []);

  return <div>{username}</div>;
}
