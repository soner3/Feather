"use client";

import {
  PasswordResetRequestSchema,
  TPasswordResetRequestSchema,
} from "@/lib/validationSchemas/PasswordResetRequestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputComponent from "../InputComponent";
import FormHeader from "../FormHeader";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";
import { useResetPasswordRequestMutation } from "@/lib/features/api/apiSlice";

export default function PasswordResetRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPasswordResetRequestSchema>({
    resolver: zodResolver(PasswordResetRequestSchema),
    defaultValues: {
      email: "",
    },
  });
  const [sendResetPasswordMail, { isLoading }] =
    useResetPasswordRequestMutation();

  async function onSubmit(data: TPasswordResetRequestSchema) {
    try {
      await sendResetPasswordMail(data).unwrap();
      toast.success("A Password Reset Mail has been sent");
    } catch (error) {
      toast.error("An Error Occurred. Please Try Again");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-3/4 flex-col rounded-lg border border-green-500 p-4 shadow-lg shadow-green-500 duration-300 md:w-1/2"
    >
      <FormHeader />
      <InputComponent
        labelValue="Email"
        inputType="email"
        inputId="passwordResetEmail"
        plcaeholder="Email"
        register={register}
        registerSchema="email"
        error={errors.email}
        errorMessage={errors.email?.message}
        required
      />
      <SubmitButton
        text={"Send Reset Password Mail"}
        isSubmitting={isLoading}
      />
    </form>
  );
}
