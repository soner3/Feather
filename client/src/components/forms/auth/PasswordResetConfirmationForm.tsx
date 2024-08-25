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
import { resetPasswordConfirm } from "@/data/authData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ServerValidationType {
  validation: Array<string>;
}

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
    formState: { isSubmitting, errors },
  } = useForm<TPasswordResetConfirmSchema>({
    resolver: zodResolver(PasswordResetConfirmSchema),
    defaultValues: {
      uid: uid,
      token: token,
      new_password: "",
      re_new_password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: TPasswordResetConfirmSchema) {
    toast.loading("Loading...");
    const res = await resetPasswordConfirm(data);

    if (!res) {
      toast.error(
        "An error occurred while password resetting. Please try Again.",
      );
    } else {
      if (res.ok) {
        reset();
        router.replace("/auth/login/");
        toast.dismiss();
        toast.success("Password reset was successfull");
      } else {
        const data: ServerValidationType = await res.json();
        toast.error(data.validation[0]);
      }
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="md:mt-30 mt-20 flex w-3/4 flex-col rounded-lg border border-green-500 p-4 duration-200 md:w-1/2"
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
      <SubmitButton text="Reset Password" isSubmitting={isSubmitting} />
    </form>
  );
}
