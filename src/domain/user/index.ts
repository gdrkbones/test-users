import { z } from "zod";

export type User = {
  id: number;
  name: string;
  gender: string;
  email: string;
  status: string;
};

export const gender_options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

export const status_options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;

export const CreateUserSquema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Must Provide a valid Email" }),
  status: z
    .union([z.literal("active"), z.literal("inactive")])
    .default("inactive"),
  gender: z.union([z.literal("male"), z.literal("female")]).default("male"),
});

export type CreateUserType = z.infer<typeof CreateUserSquema>;
