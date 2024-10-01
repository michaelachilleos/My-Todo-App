import { clsx, type ClassValue } from "clsx"; // Utility for conditional class names
import { twMerge } from "tailwind-merge"; // Utility to merge Tailwind CSS classes

// Function to merge class names with Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Merges and resolves class names
}
