import { z } from "zod";
export const SignUpSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(12, "Password must be at most 12 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/,
      "Password must contain one upper case one lower case one number"
    ),
});
