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
import { sendResetPasswordMail } from "@/data/authData";
import { toast } from "react-toastify";
import { useState } from "react";

interface ServerValidationType {
  email: Array<string>;
}

export default function PasswordResetRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TPasswordResetRequestSchema>({
    resolver: zodResolver(PasswordResetRequestSchema),
    defaultValues: {
      email: "",
    },
  });
  const [sentMail, setSentMail] = useState(false);

  async function onSubmit(data: TPasswordResetRequestSchema) {
    const res = await sendResetPasswordMail(data);

    if (!res) {
      toast.error(
        "An error occurred while sending the mail. Please try again.",
      );
    } else {
      if (res.ok) {
        setSentMail(true);
        toast.success("A Password Reset Mail has been sent");
      } else {
        const data: ServerValidationType = await res.json();
        toast.error(data.email[0]);
      }
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
        text={`${sentMail ? "Resent Reset Password Mail" : "Send Reset Password Mail"}`}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
