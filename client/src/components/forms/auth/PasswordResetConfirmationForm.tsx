"use client";

import {
  PasswordResetConfirmSchema,
  TPasswordResetConfirmSchema,
} from "@/lib/validationSchemas/PasswordResetConfirmSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormHeader from "../FormHeader";
import InputComponent from "../InputComponent";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useResetPasswordConfirmationMutation } from "@/lib/features/api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PasswordResetServerError } from "@/lib/interfaces";
import { useState } from "react";

export default function PasswordResetConfirmationForm({
  uid,
  token,
}: {
  uid: string;
  token: string;
}) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<TPasswordResetConfirmSchema>({
    resolver: zodResolver(PasswordResetConfirmSchema),
    defaultValues: {
      uid: uid,
      token: token,
      new_password: "",
      re_new_password: "",
    },
  });
  const [sendPasswordConfirmation, { isLoading }] =
    useResetPasswordConfirmationMutation();
  const [serverError, setServerError] =
    useState<null | PasswordResetServerError>(null);
  const router = useRouter();

  async function onSubmit(data: TPasswordResetConfirmSchema) {
    toast.loading("Loading...");
    try {
      await sendPasswordConfirmation(data).unwrap();
      toast.dismiss();

      reset();
      setServerError(null);
      router.replace("/auth/login/");
      toast.success("Password reset was successfull");
    } catch (error) {
      toast.dismiss();
      const fetchError = error as FetchBaseQueryError;
      const errorMessages = fetchError.data as PasswordResetServerError;
      setServerError(errorMessages);
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
        labelValue="New Password"
        inputType="password"
        inputId="newPassword"
        plcaeholder="New Password"
        register={register}
        registerSchema="new_password"
        error={errors.new_password}
        errorMessage={errors.new_password?.message}
        required
      />
      <InputComponent
        labelValue="Confirm New Password"
        inputType="password"
        inputId="reNewPassword"
        plcaeholder="Confirm New Password"
        register={register}
        registerSchema="re_new_password"
        error={errors.re_new_password}
        errorMessage={errors.re_new_password?.message}
        required
      />
      {serverError && (
        <ul className="error flex flex-col items-center p-2">
          {serverError.new_password &&
            serverError.new_password.map((message) => {
              return <li key={message}>{message}</li>;
            })}
        </ul>
      )}
      <SubmitButton text="Reset Password" isSubmitting={isLoading} />
    </form>
  );
}
