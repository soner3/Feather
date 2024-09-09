import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

export default function PostPagination({
  page,
  next,
  previous,
  nextPage,
  previousPage,
}: {
  page: number;
  nextPage: (next: null | string) => void;
  previousPage: (previous: null | string) => void;
  previous: null | string;
  next: null | string;
}) {
  return (
    <div className="m-2 flex items-center gap-2 p-2">
      <button
        disabled={!previous}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
        onClick={() => previousPage(previous)}
      >
        <HiArrowSmallLeft className="size-6" />
      </button>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-xl text-white">
        {page}
      </div>
      <button
        disabled={!next}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
        onClick={() => nextPage(next)}
      >
        <HiArrowSmallRight className="size-6" />
      </button>
    </div>
  );
}
