"use client"; // This file runs on the client

import { useState } from "react"; // React hooks
import { Todo } from "@/lib/types"; // Importing Todo type
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"; // Importing Table components
import LoadingButton from "./LoadingButton"; // Importing LoadingButton component
import { markTodoAsCompleted } from "@/app/(actions)/todoMarkedCompleted"; // Importing markTodoAsCompleted action
import { Tododelete } from "@/app/(actions)/deleteTodo"; // Importing Tododelete action
import { updateTodo } from "@/app/(actions)/todoUpdate"; // Importing updateTodo action

// Props interface for TodoPending component
interface TodoPendingProps {
  todos: Todo[];
  refreshTodos: () => void;
}

// TodoInProgress component
export default function TodoInProgress({
  todos,
  refreshTodos,
}: TodoPendingProps) {
  const [loadingUpdate, setLoadingUpdate] = useState<number | null>(null); // State to store update loading state
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null); // State to store delete loading state

  // Function to handle mark as completed
  const handleMarkAsCompleted = async (id: number) => {
    setLoadingUpdate(id);
    await markTodoAsCompleted(id);
    await updateTodo(id, { completed: true, createdAt: new Date() });
    refreshTodos();
    setTimeout(() => setLoadingUpdate(null), 2000);
  };

  // Function to handle delete
  const handleDelete = async (id: number) => {
    setLoadingDelete(id);
    await Tododelete(id);
    refreshTodos();
    setTimeout(() => setLoadingDelete(null), 2000);
  };

  // Filter pending todos
  if (todos.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-center font-bold">No todos, Add some!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      <Table>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id} className="hover:bg-gray-100">
              <TableCell>{todo.title}</TableCell>
              <TableCell className="bg-yellow-400 p-6">
                {!todo.completed && "Pending"}
              </TableCell>
              <TableCell className="p-2">
                {new Date(todo.createdAt).toLocaleString()}
              </TableCell>
              <TableCell className="p-2">
                <LoadingButton
                  className="bg-green-600 hover:bg-green-700 font-bold"
                  loading={loadingUpdate === todo.id}
                  onClick={() => handleMarkAsCompleted(todo.id)}
                >
                  Mark as completed
                </LoadingButton>
              </TableCell>
              <TableCell className="p-2">
                <LoadingButton
                  loading={loadingDelete === todo.id}
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 font-bold"
                >
                  Delete
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
