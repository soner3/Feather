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
  new_password: Array<string>;
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
      toast.dismiss();
      if (res.ok) {
        reset();
        router.replace("/auth/login/");
        toast.success("Password reset was successfull");
      } else {
        const data: ServerValidationType = await res.json();
        if (data.new_password) {
          toast.error(data.new_password[0]);
        } else {
          toast.error("An Error Occurred during Password Reset");
        }
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
