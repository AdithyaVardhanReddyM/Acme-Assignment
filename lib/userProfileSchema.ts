import { z } from "zod";

export const UserProfileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  imgUrl: z.string().optional(),
  address: z.string().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
