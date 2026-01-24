import { z } from "zod";

export const projectSchema = z.object({
    name: z
        .string({ required_error: "Project name is required" })
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name cannot exceed 50 characters")
        .trim(),

    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .or(z.literal('')), // Taaki empty string bhi accept ho jaye

    status: z
        .enum(["active", "completed", "archived"])
        .default("active")
        .optional(),

    tags: z
        .array(z.string())
        .optional()
        .default([]),

});