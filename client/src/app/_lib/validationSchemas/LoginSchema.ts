import * as z from "zod";

const emailRegex = /^[a-zA-Z0-9_@.+-]/;

export const LoginSchema = z.object({
  email: z.string().regex(emailRegex, {
    message: "This field can only contain letters, digits, _, @, +, . and -",
  }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be atleast 8 letters long" }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
