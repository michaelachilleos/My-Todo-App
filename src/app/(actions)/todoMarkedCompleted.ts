"use server"; // This file runs on the server

import prisma from "@/lib/prisma"; // Importing the Prisma Client

// Function to mark a todo as completed
export async function markTodoAsCompleted(id: number) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id }, // Specify the todo to update by its ID
      data: { completed: true }, // Mark the todo as completed
    });
    return { success: true, data: updatedTodo }; // Return success response with updated todo
  } catch (error) {
    console.error("Error updating todo status:", error); // Log the error
    return { success: false, error: "Unable to mark todo as completed" }; // Return error response
  }
}
