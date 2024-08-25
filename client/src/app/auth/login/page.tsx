import LoginForm from "@/components/forms/auth/LoginForm";

export default async function page() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <LoginForm />
    </section>
  );
}
