"use client";

import { login } from "@/app/_api/auth/authData";
import { useAppDispatch } from "@/app/_lib/hooks/reduxHooks";
import { LoginSchema, TLoginSchema } from "@/app/_lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormHeader from "../FormHeader";
import { useRouter } from "next/navigation";
import { setLogin } from "@/app/_lib/features/authSlice";
import InputComponent from "../InputComponent";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginSchema) => {
    toast.loading("Login...");
    try {
      const response_data = await login(data);
      if (response_data) {
        toast.dismiss();
        dispatch(setLogin(response_data.username));
        toast.success("Login Successfull");
        reset();
        router.push("/");
      }
    } catch {
      toast.dismiss();
      toast.error("An error occurred during login");
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mt-40 flex w-1/2 flex-col gap-5 rounded-lg border border-green-500 p-4 text-black shadow-md dark:text-white"
    >
      <FormHeader />
      <InputComponent
        labelValue="Username or Email"
        inputId="loginEmail"
        inputType="text"
        required
        plcaeholder="Username or Email"
        register={register}
        registerSchema="email"
        error={errors.email}
        errorMessage={errors.email?.message}
      />
      <InputComponent
        labelValue="Password"
        inputId="loginPassword"
        inputType="password"
        required
        plcaeholder="password"
        register={register}
        registerSchema="password"
        error={errors.password}
        errorMessage={errors.password?.message}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto w-1/2 items-center rounded-lg bg-green-600 p-2 text-white duration-300 hover:scale-105 active:scale-90"
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
