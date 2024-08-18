import { z } from "zod";

export const UpdateFormSchema = z.object({
  email: z.string().email().optional(),
  password: z
    .string()
    .min(2, {
      message: "Password Must atleast 2 Characters",
    })
    .max(10, {
      message: "Password Must be less than 10 characters",
    })
    .optional(),
  avatar: z.string().optional(),
  username: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export type UpdateFormType = z.infer<typeof UpdateFormSchema>;
