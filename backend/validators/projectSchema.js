import { z } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Setup DOMPurify with JSDOM
const window = new JSDOM("").window;
const purify = DOMPurify(window);

// Helper function to sanitize strings
const clean = (val) => purify.sanitize(val.trim());

export const projectValidations = z.object({
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

}).transform((data) => {
    // Sanitize all string fields
    return {
        ...data,
        name: clean(data.name),
        description: data.description ? clean(data.description) : data.description,
        tags: data.tags ? data.tags.map(tag => clean(tag)) : data.tags,
    };
});