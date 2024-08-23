"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import InputComponent from "../InputComponent";
import FormHeader from "../FormHeader";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { resendActivationEmail, createUser } from "@/data/authData";
import {
  TRegisterUserSchema,
  RegisterUserSchema,
} from "@/lib/validationSchemas";

interface ServerValidationType {
  username: Array<string>;
  email: Array<string>;
  first_name: Array<string>;
  last_name: Array<string>;
  password: Array<string>;
  re_password: Array<string>;
}

export default function RegisterForm() {
  const {
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

  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [firstError, setFirstError] = useState<string | undefined>();
  const [lastError, setLastError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [re_passwordError, setRe_PasswordError] = useState<
    string | undefined
  >();

  const [resendEmail, setResendEmail] = useState(false);
  const [emailField, setEmailField] = useState("");

  async function onSubmit(data: TRegisterUserSchema) {
    toast.loading("Loading...");
    if (resendEmail) {
      const res = await resendActivationEmail(emailField);
      if (res?.ok) {
        toast.dismiss();
        toast.success("Activation Mail got resended");
      } else {
        const data: ServerValidationType | undefined = await res?.json();
        if (data) {
          setEmailError(data.email[0]);
        }
      }
      return;
    } else {
      try {
        const res = await createUser(data);
        if (res.ok) {
          toast.dismiss();
          toast.success("User created An activation Mail has been send");
          setEmailField(data.email);
          setEmailError(undefined);
          setUsernameError(undefined);
          setFirstError(undefined);
          setLastError(undefined);
          setPasswordError(undefined);
          setRe_PasswordError(undefined);
          setResendEmail(true);
        } else {
          toast.dismiss();
          toast.error("Something went wrong");
          const data: ServerValidationType = await res.json();
          setUsernameError(data.username[0]);
          setEmailError(data.email[0]);
          setFirstError(data.first_name[0]);
          setLastError(data.last_name[0]);
          setPasswordError(data.password[0]);
          setRe_PasswordError(data.re_password[0]);
        }
      } catch (error) {
        toast.dismiss();
        toast.error("An error occurred during registration");
      }
    }
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
          error={usernameError ? usernameError : errors.username}
          errorMessage={
            usernameError ? usernameError : errors.username?.message
          }
        />
        <InputComponent
          labelValue="Email"
          required
          inputType="email"
          inputId="registerEmail"
          plcaeholder="Email"
          register={register}
          registerSchema="email"
          error={emailError ? emailError : errors.email}
          errorMessage={emailError ? emailError : errors.email?.message}
        />
        <InputComponent
          labelValue="First Name"
          required
          inputType="text"
          inputId="registerFirstName"
          plcaeholder="First Name"
          register={register}
          registerSchema="first_name"
          error={firstError ? firstError : errors.first_name}
          errorMessage={firstError ? firstError : errors.first_name?.message}
        />

        <InputComponent
          labelValue="Password"
          required
          inputType="password"
          inputId="registerPassword"
          plcaeholder="Password"
          register={register}
          registerSchema="password"
          error={passwordError ? passwordError : errors.password}
          errorMessage={
            passwordError ? passwordError : errors.password?.message
          }
        />
        <InputComponent
          labelValue="Last Name"
          required
          inputType="text"
          inputId="registerLastName"
          plcaeholder="Last Name"
          register={register}
          registerSchema="last_name"
          error={lastError ? lastError : errors.last_name}
          errorMessage={lastError ? lastError : errors.last_name?.message}
        />
        <InputComponent
          labelValue="Confirm Password"
          required
          inputType="password"
          inputId="registerConfirmPassword"
          plcaeholder="Confirm Password"
          register={register}
          registerSchema="re_password"
          error={re_passwordError ? re_passwordError : errors.re_password}
          errorMessage={
            re_passwordError ? re_passwordError : errors.re_password?.message
          }
        />
      </div>
      <SubmitButton
        isSubmitting={isSubmitting}
        text={`${resendEmail ? "Resend Activation Mail" : "Register"}`}
      />
    </form>
  );
}
