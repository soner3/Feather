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
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
        dispatch(setLogin(response_data.username));
        toast.success("Login Successfull");
        reset();
        router.replace("/");
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
    </form>
  );
}
