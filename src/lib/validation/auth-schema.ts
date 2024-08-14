import { z } from "zod";

export const AuthFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, {
      message: "Password Must atleast 2 Characters",
    })
    .max(10, {
      message: "Password Must be less than 10 characters",
    }),
  avatar: z.string().optional(),
  username: z.string().optional(),
});

export type AuthFormType = z.infer<typeof AuthFormSchema>;
