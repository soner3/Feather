"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormHeader from "../FormHeader";
import InputComponent from "../InputComponent";
import SubmitButton from "./SubmitButton";
import { setLogin } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/reduxHooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TLoginSchema, LoginSchema } from "@/lib/validationSchemas/LoginSchema";
import { useGetTokenMutation } from "@/lib/features/api/apiSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const [getToken, { isLoading }] = useGetTokenMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginSchema) => {
    toast.loading("Loading...");
    try {
      const response_data = await getToken(data).unwrap();

      toast.dismiss();
      localStorage.setItem("username", response_data.username);
      dispatch(setLogin(response_data.username));
      router.replace("/feather/posts/");
      toast.success("Login Successfull");
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred during login");
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-3/4 flex-col rounded-lg border border-green-500 p-4 shadow-lg shadow-green-500 duration-300 md:w-1/2"
    >
      <FormHeader />
      <p className="text-center">
        No Account?{" "}
        <Link
          className="text-green-500 hover:text-green-600 hover:underline"
          href={"/auth/register/"}
        >
          Register
        </Link>
      </p>
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
      <p className="my-1 pr-4 text-right text-green-500 hover:text-green-600 hover:underline">
        <Link href={"/auth/password/reset/"}>Forgot Password?</Link>
      </p>
      <SubmitButton isSubmitting={isLoading} text="Login" />
    </form>
  );
}
