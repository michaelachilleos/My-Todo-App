"use client"; // This file runs on the client

import { useState, useEffect } from "react"; // React hooks
import TodoForm from "./TodoForm"; // Importing TodoForm component
import TodoCompleted from "./TodoCompleted"; // Importing TodoCompleted component
import TodoInProgress from "./TodoInProgress"; // Importing TodoInProgress component
import { TodoPending } from "@/app/(actions)/todoPending";
import { Todo } from "@/lib/types"; // Importing Todo type
import LoadingTodo from "./LoadingTodo"; // Importing LoadingTodo component

// TodoApp component
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]); // State to store todos
  const [error, setError] = useState<string | undefined>(undefined); // State to store error
  const [loading, setLoading] = useState<boolean>(true); // State to store loading state

  // Function to fetch todos
  const fetchTodos = async (): Promise<void> => {
    setError(undefined);
    setLoading(true);
    try {
      const result = await TodoPending();
      const { error, data: fetchedTodos } = result || {};
      if (error) {
        setError(error);
      } else {
        setTodos((fetchedTodos as unknown as Todo[]) || []);
      }
    } catch {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // If error, display error message
  if (error) {
    return <div>{error}</div>;
  }

  const pendingTodos = todos.filter((todo) => !todo.completed); // Filter pending todos
  const completedTodos = todos.filter((todo) => todo.completed); // Filter completed todos

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">My Todos</h1>
      <TodoForm refreshTodos={fetchTodos} />
      <LoadingTodo isLoading={loading} />
      {!loading && (
        <>
          <TodoInProgress todos={pendingTodos} refreshTodos={fetchTodos} />
          <TodoCompleted todos={completedTodos} refreshTodos={fetchTodos} />
        </>
      )}
    </div>
  );
}
