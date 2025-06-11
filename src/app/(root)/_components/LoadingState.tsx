"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingState({ 
  message = "Loading...", 
  size = "md" 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-3 p-4"
    >
      <div className="relative">
        <Loader2 
          className={`${sizeClasses[size]} animate-spin text-blue-400`} 
        />
        <div className="absolute inset-0 blur animate-pulse" />
      </div>
      <p className="text-sm text-gray-400">{message}</p>
    </motion.div>
  );
} 