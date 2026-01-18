import z from "zod";

export const EmergencyContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z
    .string()
    .min(10, "Number must be at least 10 digits")
    .regex(/^\d+$/, "Number must be numeric"),
});

export type EmergencyContactType = z.infer<typeof EmergencyContactSchema>;
