import * as z from "zod";

export const UserActivationSchema = z.object({
  uid: z.string().trim(),
  token: z.string().trim(),
});

export type TUserActivationSchema = z.infer<typeof UserActivationSchema>;
