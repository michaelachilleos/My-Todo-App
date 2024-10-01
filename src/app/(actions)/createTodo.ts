"use server"; // This file runs on the server

import prisma from "@/lib/prisma"; // Importing the Prisma Client
import { todoSchema, TodoValues } from "@/lib/validation"; // Importing validation schema
import { isRedirectError } from "next/dist/client/components/redirect"; // Error handling for redirects
import { redirect } from "next/navigation"; // Navigation utilities

// Function to create a new todo
export async function Todocreate(
  credentials: TodoValues
): Promise<{ error: string }> {
  try {
    const { title } = todoSchema.parse(credentials); // Validate and extract title

    // Check if the todo already exists
    const existingTodo = await prisma.todo.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive", // Case-insensitive check
        },
      },
    });

    // Return an error if the todo already exists
    if (existingTodo) {
      return { error: "Todo already exists" };
    }

    // Create the new todo in the database
    await prisma.todo.create({
      data: {
        title,
        completed: false, // New todos are initially marked as incomplete
      },
    });

    return redirect("/"); // Redirect after creation
  } catch (error) {
    // Handle redirect errors
    if (isRedirectError(error)) throw error;
    console.error(error); // Log the error
    return { error: "An error occurred" }; // Return a general error
  }
}
