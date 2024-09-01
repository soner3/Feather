"use client";

import { PostsDataType, PostType } from "@/data/postData";
import { useState } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function PostPagination({
  count,
  activeValue,
  next,
  previous,
  handleSetActiveValue,
  handleSetNext,
  handleSetNumberPosts,
  handleSetPosts,
  handleSetPrevious,
}: {
  count: number;
  activeValue: number;
  next: string | null;
  previous: string | null;
  handleSetPosts: (postData: PostType[]) => void;
  handleSetNext: (nextFetch: string | null) => void;
  handleSetPrevious: (previousFetch: string | null) => void;
  handleSetActiveValue: (newValue: number) => void;
  handleSetNumberPosts: (newValue: number) => void;
}) {
  const countArray: Array<number> = Array.from(
    { length: count },
    (_, index) => index,
  );
  const [notVisibleButtonValue, setNotVisibleButtonValue] = useState(0);

  const numberVisibleButton = 4;
  let isFilled = false;
  let smallValueFilled = false;
  let counter = 0;

  async function handleNext() {
    if (notVisibleButtonValue <= countArray.length && next) {
      const data = await getClientSidePostList(next);
      if (!data) {
        toast.error("An Error occurred.");
        return;
      }
      setNotVisibleButtonValue(notVisibleButtonValue + 1);
      handleSetActiveValue(activeValue + 1);

      handleSetNext(data.next);
      handleSetNumberPosts(data.count);
      handleSetPosts(data.results);
      handleSetPrevious(data.previous);
    }
  }

  async function handlePrevious() {
    if (notVisibleButtonValue >= 1 && previous) {
      const data = await getClientSidePostList(previous);
      if (!data) {
        toast.error("An Error occurred.");
        return;
      }
      setNotVisibleButtonValue(notVisibleButtonValue - 1);
      handleSetActiveValue(activeValue - 1);
      handleSetNext(data.next);
      handleSetNumberPosts(data.count);
      handleSetPosts(data.results);
      handleSetPrevious(data.previous);
    }
  }

  async function handlePageChange(newValue: number) {
    const url = `http://localhost/posts/list/?page=${newValue + 1}`;
    const data = await getClientSidePostList(url);
    if (!data) {
      toast.error("An Error occurred.");
      return;
    }

    setNotVisibleButtonValue(newValue);
    handleSetActiveValue(newValue + 1);
    handleSetNext(data.next);
    handleSetNumberPosts(data.count);
    handleSetPosts(data.results);
    handleSetPrevious(data.previous);
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="pagination-button flex h-10 w-10 items-center justify-center"
        disabled={activeValue <= 1}
        onClick={handlePrevious}
      >
        <HiChevronDoubleLeft className="size-5" />
      </button>

      {countArray.map((value) => {
        if (value + 1 <= notVisibleButtonValue) {
          if (smallValueFilled) {
            return;
          }

          smallValueFilled = true;
          return (
            <button
              key={value}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500"
              disabled={true}
            >
              ...
            </button>
          );
        }

        if (counter >= numberVisibleButton) {
          if (isFilled) {
            ++counter;
            return;
          }

          ++counter;
          isFilled = true;
          return (
            <button
              key={value}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500"
              disabled={true}
            >
              ...
            </button>
          );
        }

        ++counter;
        return (
          <button
            key={value}
            className={`pagination-button flex h-10 w-10 items-center justify-center ${value + 1 === activeValue && "bg-green-500 text-white"}`}
            disabled={value + 1 === activeValue}
            onClick={() => handlePageChange(value)}
          >
            {value + 1}
          </button>
        );
      })}

      <button
        className="pagination-button flex h-10 w-10 items-center justify-center"
        disabled={activeValue >= countArray.length}
        onClick={handleNext}
      >
        <HiChevronDoubleRight className="size-5" />
      </button>
    </div>
  );
}

export async function getClientSidePostList(
  url: string,
): Promise<PostsDataType | null> {
  try {
    const res = await fetch(setDomainName(url), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

function setDomainName(url: string): string {
  if (url.includes("nginx")) {
    return url.replace("nginx", "localhost:8080");
  } else {
    return url.replace("localhost", "localhost:8080");
  }
}
