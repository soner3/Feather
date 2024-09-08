"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputComponent from "../InputComponent";
import FormHeader from "../FormHeader";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import {
  TRegisterUserSchema,
  RegisterUserSchema,
} from "@/lib/validationSchemas/RegisterSchema";
import {
  useCreateUserMutation,
  useResendActivationMailMutation,
} from "@/lib/features/api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RegisterFormFieldError } from "@/lib/interfaces";

export default function RegisterForm() {
  const {
    formState: { errors },
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
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [resendActivationMail, { isLoading: isResending }] =
    useResendActivationMailMutation();
  const [emailField, setEmailField] = useState<null | string>(null);
  const [serverError, setServerError] = useState<null | RegisterFormFieldError>(
    null,
  );

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmailField(email);
    }
  }, []);

  async function handleResendMail() {
    if (emailField) {
      try {
        await resendActivationMail({ email: emailField }).unwrap();
        toast.dismiss();
        toast.success("Activation Mail resended");
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(
          "An Error Occurred While resending Activation Mail. Try Again",
        );
      }
    }
  }

  async function onSubmit(data: TRegisterUserSchema) {
    toast.loading("Loading...");
    try {
      await createUser(data).unwrap();
      toast.dismiss();
      toast.success("User created An activation Mail has been send");
      localStorage.setItem("email", data.email);
      setEmailField(data.email);
      setServerError(null);
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;
      const errorMessage = fetchError.data as RegisterFormFieldError;
      setServerError(errorMessage);
      toast.dismiss();
      toast.error("An error occurred during registration");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-4/5 flex-col rounded-lg border border-green-500 p-4 shadow-lg shadow-green-500 duration-300"
    >
      <FormHeader />
      <div className="grid grid-cols-1 md:grid-cols-2">
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
      {serverError && (
        <ul className="error flex flex-col items-center p-2">
          {serverError.email && <li>{serverError.email[0]}</li>}
          {serverError.first_name && <li>{serverError.first_name[0]}</li>}
          {serverError.last_name && <li>{serverError.last_name[0]}</li>}
          {serverError.username && <li>{serverError.username[0]}</li>}
          {serverError.password &&
            serverError.password.map((message) => {
              return <li key={message}>{message}</li>;
            })}
        </ul>
      )}
      <SubmitButton isSubmitting={isLoading} text={"Register"} />
      {emailField && (
        <button
          type="button"
          disabled={isResending}
          onClick={handleResendMail}
          className="mx-auto my-2 w-3/4 items-center rounded-lg bg-green-600 p-2 text-white duration-300 hover:scale-105 active:scale-90 active:bg-green-700 disabled:bg-green-700 md:w-1/2"
        >
          {isResending ? "Loading..." : "Resend Activation Mail"}
        </button>
      )}
    </form>
  );
}
