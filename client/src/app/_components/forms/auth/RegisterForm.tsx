"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterUserSchema } from "@/app/_lib/validationSchemas";
import { useFormStatus } from "react-dom";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      re_password: "",
    },
  });

  const { pending } = useFormStatus();

  const onSubmit = async (values: z.infer<typeof RegisterUserSchema>) => {
    try {
    } catch (error) {}
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
}
