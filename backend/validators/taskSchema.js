import { z } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Setup DOMPurify with JSDOM
const window = new JSDOM("").window;
const purify = DOMPurify(window);

// Helper function to sanitize strings
const clean = (val) => purify.sanitize(val.trim());

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

  assigneerRole: z
    .enum(["developer", "qa/tester", "designer", "devops", "manager", "lead"], {
      error_message: "Invalid role selected",
    })
    .default("developer"),
  priority: z
    .enum(["low", "medium", "high", "critical"], {
      error_message: "Priority must be low, medium, high, or critical",
    })
    .default("low"),
  dueDate: z.string().optional(),
}).transform((data) => {
  return {
    ...data,
    title: clean(data.title),
    description: data.description ? clean(data.description) : data.description,
  };
});

// Update ke liye hum saari fields ko optional bana dete hain (partial update)
export const updateTaskValidations = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  assignedTo: objectIdSchema.optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  dueDate: z.date().optional(),
  assigneerRole: z
    .enum(["developer", "qa/tester", "designer", "devops", "manager", "lead"])
    .optional(),
}).transform((data) => {
  const transformedData = { ...data };

  if (data.title) {
    transformedData.title = clean(data.title);
  }
  if (data.description) {
    transformedData.description = clean(data.description);
  }
  return transformedData;
}); 