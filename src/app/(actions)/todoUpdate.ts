"use server"; // This file runs on the server

import prisma from "@/lib/prisma"; // Importing the Prisma Client

// Function to update a todo's status and creation date
export async function updateTodo(
  id: number,
  data: { completed: boolean; createdAt: Date }
) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id }, // Specify the todo to update by its ID
      data, // Update data passed to the function
    });
    return { success: true, data: updatedTodo }; // Return success response with updated todo
  } catch (error) {
    console.error("Error updating todo:", error); // Log the error
    return { success: false, error: "Unable to update todo" }; // Return error response
  }
}
