import LoginForm from "@/components/forms/auth/LoginForm";

export default async function page() {
  return (
    <div className="flex w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}
