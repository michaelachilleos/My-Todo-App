"use server"; // This file runs on the server

import prisma from "@/lib/prisma"; // Importing the Prisma Client
import { isRedirectError } from "next/dist/client/components/redirect"; // Error handling for redirects
import { redirect } from "next/navigation"; // Navigation utilities
import { Todo } from "@/lib/types"; // Importing the Todo type

// Function to list all todos from the database
export async function TodoPending(): Promise<{ data?: Todo[]; error?: string }> {
  try {
    const values = await prisma.todo.findMany(); // Fetch all todos

    // Map the result to the Todo type
    if (values.length > 0) {
      const todos = values.map((todo) => ({
        ...todo,
        id: Number(todo.id), // Ensure ID is a number
        createdAt: todo.createdAt.toISOString(), // Format date to ISO string
      })) as unknown as Todo[];
      return { data: todos }; // Return the fetched todos
    }

    return redirect("/"); // Redirect if no todos found
  } catch (error) {
    // Handle redirect errors
    if (isRedirectError(error)) throw error;
    console.error(error); // Log the error
    return { error: "An error occurred" }; // Return general error
  }
}
