import { Metadata } from "next";
import TodoApp from "@/components/TodoApp";

export const meta: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center p-5 ">
        <TodoApp />
      </div>
  );
}