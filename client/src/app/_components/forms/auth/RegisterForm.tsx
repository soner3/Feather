"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterUserSchema,
  TRegisterUserSchema,
} from "@/app/_lib/validationSchemas";
import { toast } from "react-toastify";
import InputComponent from "../InputComponent";
import FormHeader from "../FormHeader";
import SubmitButton from "./SubmitButton";

export default function RegisterForm() {
  const {
    reset,
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<TRegisterUserSchema>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  function onSubmit(data: TRegisterUserSchema) {
    toast.loading("Loading...");
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="md:mt-30 mt-20 flex w-4/5 flex-col gap-5 rounded-lg border border-green-500 p-4 duration-200"
    >
      <FormHeader />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputComponent
          labelValue="Username"
          required
          inputType="text"
          inputId="registerUsername"
          plcaeholder="Username"
          register={register}
          registerSchema="username"
          error={errors.username}
          errorMessage={errors.username?.message}
        />
        <InputComponent
          labelValue="Email"
          required
          inputType="email"
          inputId="registerEmail"
          plcaeholder="Email"
          register={register}
          registerSchema="email"
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <InputComponent
          labelValue="First Name"
          required
          inputType="text"
          inputId="registerFirstName"
          plcaeholder="First Name"
          register={register}
          registerSchema="first_name"
          error={errors.first_name}
          errorMessage={errors.first_name?.message}
        />

        <InputComponent
          labelValue="Password"
          required
          inputType="password"
          inputId="registerPassword"
          plcaeholder="Password"
          register={register}
          registerSchema="password"
          error={errors.password}
          errorMessage={errors.password?.message}
        />
        <InputComponent
          labelValue="Last Name"
          required
          inputType="text"
          inputId="registerLastName"
          plcaeholder="Last Name"
          register={register}
          registerSchema="last_name"
          error={errors.last_name}
          errorMessage={errors.last_name?.message}
        />
        <InputComponent
          labelValue="Confirm Password"
          required
          inputType="password"
          inputId="registerConfirmPassword"
          plcaeholder="Confirm Password"
          register={register}
          registerSchema="re_password"
          error={errors.re_password}
          errorMessage={errors.re_password?.message}
        />
      </div>
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
