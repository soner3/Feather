"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormHeader from "../FormHeader";
import InputComponent from "../InputComponent";
import SubmitButton from "./SubmitButton";
import { login } from "@/data/authData";
import { setLogin } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import { TLoginSchema, LoginSchema } from "@/lib/validationSchemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        localStorage.setItem("username", response_data.username);
        dispatch(setLogin(response_data.username));
        router.replace("/");
        setIsAuth(true);
        toast.success("Login Successfull");
        reset();
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
      className="md:mt-30 mt-20 flex w-1/2 flex-col gap-5 rounded-lg border border-green-500 p-4 duration-200"
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
      <SubmitButton isSubmitting={isSubmitting} text="Login" />
      {isAuth && (
        <Link
          href={"/"}
          className="mx-auto my-1 w-1/2 rounded-lg bg-green-600 p-2 text-center text-white duration-300 hover:scale-105 active:scale-90"
        >
          Go to Homepage
        </Link>
      )}
    </form>
  );
}
