export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col dark:bg-slate-900">
      <div className="flex flex-1 items-center justify-center bg-transparent dark:bg-slate-900">
        <div className="loader size-28 border-slate-900 bg-yellow-500 text-yellow-500"></div>
      </div>
    </div>
  );
}
