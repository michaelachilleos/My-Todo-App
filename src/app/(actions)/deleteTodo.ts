"use server"; // This file runs on the server

import prisma from "@/lib/prisma"; // Importing the Prisma Client

// Function to delete a todo item by its ID
export async function Tododelete(id: number) {
  try {
    await prisma.todo.delete({
      where: { id }, // Specify the todo to delete by its ID
    });
    return { success: true }; // Return success response
  } catch (error) {
    console.error("Error deleting todo:", error); // Log the error
    return { error: "Failed to delete todo" }; // Return error response
  }
}
