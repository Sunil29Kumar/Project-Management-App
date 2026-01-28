import { z } from "zod";

// Helper function to check for valid MongoDB ObjectId string
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createTaskValidations = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title is too long"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  status: z
    .enum(["todo", "in-progress", "done"], {
      error_message: "Status must be todo, in-progress, or done",
    })
    .default("todo"),

  assignedTo: objectIdSchema.optional(),
});

// Update ke liye hum saari fields ko optional bana dete hain (partial update)
export const updateTaskValidations = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  assignedTo: objectIdSchema.optional(),
});