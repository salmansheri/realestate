import * as z from "zod";

export const postFormSchema = z.object({
  title: z.string(),
  price: z.string(),
  address: z.string(),
  city: z.string(),
  bedroom: z.string(),
  bathroom: z.string(),
  type: z.enum(["buy", "rent"]),
  property: z.enum(["apartment", "house", "condo", "land"]),
  latitude: z.string(),
  longitude: z.string(),
  images: z.any(),
  postDetails: z.object({
    description: z.string(),
    utilities: z.string(),
    pet: z.string(),
    income: z.string().optional(),
    size: z.string(),
    school: z.string(),
    bus: z.string(),
    restaurent: z.string(),
  }),
});

export type PostFormType = z.infer<typeof postFormSchema>;
