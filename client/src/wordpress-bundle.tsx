import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import App from './App';
import "./index.css";

// Declare the global type for the initialization function
declare global {
  interface Window {
    initializeCalendarApp: (containerId: string) => void;
  }
}

// Function to initialize the app
window.initializeCalendarApp = function(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
};

// Auto-initialize if the default container exists
document.addEventListener('DOMContentLoaded', () => {
  const defaultContainer = document.getElementById('calendar-app-container');
  if (defaultContainer) {
    window.initializeCalendarApp('calendar-app-container');
  }
});