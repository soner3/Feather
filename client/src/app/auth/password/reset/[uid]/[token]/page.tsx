import PasswordResetConfirmationForm from "@/components/forms/auth/PasswordResetConfirmationForm";

export default function Page({
  params,
}: {
  params: { uid: string; token: string };
}) {
  return (
    <section className="flex flex-1 items-center justify-center">
      <PasswordResetConfirmationForm uid={params.uid} token={params.token} />
    </section>
  );
}
