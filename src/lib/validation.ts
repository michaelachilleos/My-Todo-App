import { z } from "zod";

// Zod schema for validating todo input
const requiredString = z.string().trim().min(1, "This field is required");

export const todoSchema = z.object({
  title: requiredString, // Title must be a non-empty string
});

// Type inference for todo values based on the schema
export type TodoValues = z.infer<typeof todoSchema>;
