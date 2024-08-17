import LoginForm from "@/app/_components/forms/auth/LoginForm";

export default async function page() {
  return (
    <div className="mb-24 flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
