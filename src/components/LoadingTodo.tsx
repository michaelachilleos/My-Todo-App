"use client"; // This file runs on the client

import React from "react"; // Importing React

// Props interface for loading state
interface LoadingTodoProps {
  isLoading: boolean; // Indicates if loading
}


// LoadingTodo component
const LoadingTodo: React.FC<LoadingTodoProps> = ({ isLoading }) => {
  return (
    <div className="mt-4">
      {isLoading ? (
        <p className="text-center font-bold">Loading todos...</p>
      ) : null}
    </div>
  );
};

export default LoadingTodo; // Export the component
