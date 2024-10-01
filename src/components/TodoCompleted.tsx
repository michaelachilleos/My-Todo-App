"use client"; // This file runs on the client

import { useState } from "react"; // React hooks
import { Todo } from "@/lib/types"; // Importing Todo type
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"; // Importing Table components
import LoadingButton from "./LoadingButton"; // Importing LoadingButton component
import { Tododelete } from "@/app/(actions)/deleteTodo"; // Importing Tododelete action
import { markTodoAsPending } from "@/app/(actions)/todoMarkedNotCompleted"; // Importing markTodoAsPending action
import { updateTodo } from "@/app/(actions)/todoUpdate"; // Importing updateTodo action

// Props interface for TodoCompleted component
interface TodoCompletedProps {
  todos: Todo[];
  refreshTodos: () => void;
}

// TodoCompleted component
export default function TodoCompleted({
  todos,
  refreshTodos,
}: TodoCompletedProps) {
  const [loadingUpdate, setLoadingUpdate] = useState<number | null>(null); // State to store update loading state
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null); // State to store delete loading state

  // Function to handle mark as pending
  const handleMarkAsPending = async (id: number) => {
    setLoadingUpdate(id);
    await markTodoAsPending(id);
    await updateTodo(id, { completed: false, createdAt: new Date() });
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

  // Filter completed todos
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="container mx-auto p-4">
      {completedTodos.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Completed Todos</h1>
          <Table>
            <TableBody>
              {completedTodos.map((todo) => (
                <TableRow key={todo.id} className="hover:bg-gray-100">
                  <TableCell>{todo.title}</TableCell>
                  <TableCell className="bg-green-700 p-6">
                    {todo.completed && "Completed"}
                  </TableCell>
                  <TableCell className="p-2">
                    {new Date(todo.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2">
                    <LoadingButton
                      className="bg-green-600 hover:bg-green-700 font-bold"
                      loading={loadingUpdate === todo.id}
                      onClick={() => handleMarkAsPending(todo.id)}
                    >
                      Mark as pending
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
        </>
      )}
    </div>
  );
}
