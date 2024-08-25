import PasswordResetConfirmationForm from "@/components/forms/auth/PasswordResetConfirmationForm";

export default function Page({
  params,
}: {
  params: { uid: string; token: string };
}) {
  return (
    <div className="flex justify-center">
      <PasswordResetConfirmationForm uid={params.uid} token={params.token} />
    </div>
  );
}
