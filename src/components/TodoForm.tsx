"use client"; // This file runs on the client

import { todoSchema, TodoValues } from "@/lib/validation"; // Importing todoSchema and TodoValues
import { useForm } from "react-hook-form"; // Importing useForm hook
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"; // Importing form components
import { Input } from "./ui/input"; // Importing Input component
import { useState, useTransition } from "react"; // React hooks
import { Todocreate } from "@/app/(actions)/createTodo"; // Importing Todocreate action
import LoadingButton from "./LoadingButton"; // Importing LoadingButton component

// Props interface for TodoForm component
interface TodoFormProps {
  refreshTodos: () => void;
}

// TodoForm component
export default function TodoForm({ refreshTodos }: TodoFormProps) {
  const [error, setError] = useState<string>(); // State to store error
  const [isPending, startTransition] = useTransition(); // State to store transition state

  // Form hook with zod resolver
  const form = useForm<TodoValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  // Function to handle form submit
  async function onSubmit(values: TodoValues) {
    setError(undefined);
    startTransition(async () => {
      const result = await Todocreate(values); // Create todo
      const { error } = result || {};
      if (error) {
        setError(error);
      } else {
        form.reset();
        refreshTodos();
      }
    });
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && <p className="text-center text-red-500">{error}</p>}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="What needs to be done"
                    {...field}
                    className="max-w-lg w-72 text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 font-bold"
          >
            Add Todo
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
