import * as z from "zod";

const usernameRegex = /^[a-zA-Z0-9_@+.-]/;

export const RegisterUserSchema = z
  .object({
    username: z.string().regex(usernameRegex, {
      message: "Username can only contain letters, digits, _, @, +, . and -",
    }),
    first_name: z
      .string()
      .trim()
      .min(2, { message: "Firt name must be atleast 2 letters long" })
      .max(50, { message: "Firt name must be less than 50 letters long" }),
    last_name: z
      .string()
      .trim()
      .min(2, { message: "Last name must be atleast 2 letters long" })
      .max(50, { message: "Last name must be less than 50 letters long" }),
    email: z.string().trim().email({ message: "Enter a valid email adddress" }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" }),
    re_password: z.string().min(8, {
      message: "Confirm Password must be atleast 8 characters long",
    }),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export type TRegisterUserSchema = z.infer<typeof RegisterUserSchema>;
