import * as z from "zod";

export const PasswordResetConfirmSchema = z
  .object({
    uid: z.string().trim(),
    token: z.string().trim(),
    new_password: z
      .string()
      .min(8, { message: "Password must contain atleast 8 letters" }),
    re_new_password: z
      .string()
      .min(8, { message: "Password must contain atleast 8 letters" }),
  })
  .refine((data) => data.new_password === data.re_new_password, {
    message: "Passwords do not match",
    path: ["re_new_password"],
  });

export type TPasswordResetConfirmSchema = z.infer<
  typeof PasswordResetConfirmSchema
>;
