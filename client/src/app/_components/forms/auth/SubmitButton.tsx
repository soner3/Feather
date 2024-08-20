export default function SubmitButton({
  isSubmitting,
  text,
}: {
  isSubmitting: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mx-auto w-1/2 items-center rounded-lg bg-green-600 p-2 text-white duration-300 hover:scale-105 active:scale-90"
    >
      {isSubmitting ? "Loading..." : text}
    </button>
  );
}
