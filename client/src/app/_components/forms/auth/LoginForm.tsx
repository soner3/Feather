"use client";

import { login } from "@/app/_api/auth/authData";
import { setAuth } from "@/app/_lib/features/authSlice";
import { useAppDispatch } from "@/app/_lib/hooks/reduxHooks";
import { LoginSchema, TLoginSchema } from "@/app/_lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormHeader from "../FormHeader";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
        console.log(response_data);
        toast.dismiss();
        dispatch(setAuth(response_data.username));
        toast.success("Login Successfull");
        reset();
      } else {
        toast.dismiss();
        toast.error("The given Credentials dont match with a User");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:w-2/3">
      <div className="flex flex-1 items-center justify-center">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5 rounded-lg border border-sky-500 p-4 shadow-md"
        >
          <FormHeader />
          <input
            type="text"
            {...register("email")}
            placeholder="email or username"
            className="input"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password")}
            className={`input ${errors.password ? "error" : ""}`}
            placeholder="password"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto w-1/2 items-center rounded-lg border border-sky-500 bg-sky-500 p-2 text-white duration-300 hover:scale-105 active:scale-90"
          >
            {isSubmitting ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
